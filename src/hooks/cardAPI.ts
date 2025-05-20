import axios from "axios";
import { Card } from "../types/CardType"

export const getCards = async(setCards: (cards: Card[]) => void) => {
    /* The line `// const url:string = "https://www.sl33p.net";` is a commented-out line of code in
    TypeScript. It is currently not being used in the function `getCards`. */
    const url:string = "https://www.sl33p.net";
    // const url:string = "http://localhost:8080";

    try {
        const response = await axios.get<Card[]>(url + "/api/cards", {
            headers: { Accept: "application/json" },
            auth: { username: "user", password: "password" }
        });
        setCards(response.data);
        console.log(response.data);
    } catch (error) {
        console.error("カード情報が取得できません。");
    }
}