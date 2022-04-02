import axios from "axios";
import { parse } from 'node-html-parser';

export interface BibleGatewayResult {
  verse: string;
  content: Array<string>;
}

/**
 * not used
 * https://github.com/Infamoustrey/bible-gateway-api
 */
export class BibleGatewayAPI {
  private parse: Function = null;

  constructor() {
    if (typeof DOMParser !== "undefined") {
      this.parse = (content: string) =>
        new DOMParser().parseFromString(content, "text/html");
    } else {
      this.parse = (content: string) => {
        const { JSDOM } = require("jsdom");
        const { document } = new JSDOM(content).window;
        return document;
      };
    }
  }

  async search(
    query = "John 3:16",
    version: string = "ESV"
  ): Promise<BibleGatewayResult> {
    let encodedSearch = encodeURIComponent(query);
    let encoodedVersion = encodeURIComponent(version);

    const url = `https://www.biblegateway.com/passage?search=${encodedSearch}&version=${encoodedVersion}`;

    const result = await axios.get(url);

    const root = parse(result.data.data);




    //return result.data;



    const verse = root.querySelector(".bcv").textContent;

    let elements = [].slice.call(root.querySelectorAll(".text"));

    let content: Array<string> = [];
    for (let i = 0; i < elements.length; i++) {
      let text = elements[i].textContent;
      if (text.substr(0, 4) != "Back") content.push(text);
    }

    if (content.length === 0) throw new Error("Could not find verse");

    console.log(verse)

    return Promise.resolve({ verse, content });
  }
}
