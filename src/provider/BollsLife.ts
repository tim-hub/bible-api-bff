import axios from 'axios';

const CHAPTER_URL = 'https://bolls.life/get-text';

// const verseUrl = 'https://bolls.life/get-paralel-verses/';


export class BollsLife {

  constructor() {

  }

  public async fetchChapter(version: string, book: number, chapter: number) {
    try {
      const axiosResponse = await axios.get(
        `${CHAPTER_URL}/${version}/${book}/${chapter}`
      );
      return axiosResponse.data;
    } catch (e) {
      console.log(e, e.response.data);
      throw e;
    }
  }
}
