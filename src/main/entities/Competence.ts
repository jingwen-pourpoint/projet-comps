
export interface Competence{
    _id?: string;
    nom: string;
    description: string;
    prerequis: Prerequis[]

}


export interface Prerequis{
    niveauMinimum: number;
    Competence: Competence
}