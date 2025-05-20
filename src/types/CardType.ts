export type Card = {
    name:string;
    cost:number;
    power:number;
    life:number;
    counter:number;
    block:number;
    text:string;
    number:number;
    rarity:{name:"L" | "C" | "UC" | "R" | "SR" | "SEC";}
    expansion:{name:string;}
    type:{name:"Leader" | "Character" | "Event" | "Stage";}
    colors:{name:string;}[];
    features:{name:string}[];
    attributes:{name:string}[];
}