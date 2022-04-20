import { CompetenceRepository } from './../main/repositories/CompetenceRepository';
import { CompetenceService } from './../main/services/CompetenceService';
import { Competence, Prerequis } from './../main/entities/Competence';


const comp = { _id:"id", nom:"", description:"", prerequis:[]}
const mockSauvegarde = jest.fn(async x=>x)

const mockRecherche = jest.fn(async id=>{
    if(id ==='id') return comp;
    throw new Error()
})

const repository: CompetenceRepository ={
    sauvegarder:  mockSauvegarde,
    rechercher: mockRecherche
}
const service = new CompetenceService(repository)

describe("Sauvegarder",()=>{
    it("Le nom d'une competence doit contenir moins de 50 chars", ()=> {
        //Given
        const competence: Competence = {
            nom: "fdgbflkehfhezoznfoezofneopnfoeznofneonfopznoenfoenfonroenfoqnonrhrrgrrgrgrgrgqongrognq",
            description: "",
            prerequis: []
        }
    
        //When && Then
        expect(async ()=> await service.sauvegarder(competence)).rejects.toThrowError()
    })
    
    
    
    it("Si la competence est valide, elle doit etre sauvegarder par le repo", async()=>{
        // Given
        const competence = {
            nom: "Test",
            description: "",
            prerequis:[]
        }
        // When
        await service.sauvegarder(competence)
        // Then
        expect(mockSauvegarde.mock.calls.length).toBe(1)
        expect(mockSauvegarde.mock.calls[0][0]).toBe(competence)
    })
    
})


describe("Rechercher",()=>{
    it("Si aucun competence porte id donné, alors retourne une erreur",()=>{
        // Given
        const id = "1";
        // When
        expect(async()=>service.chercher(id)).rejects.toThrowError();
    })

    it("Si id est valide, retourne une competence portant id", async()=>{
        // Given
        const id = "id";
        // When 
        const result = await service.chercher(id);
        // Then 
        expect(result._id).toBe(id)
    })


    it("Recherche dans le repo, si la competence id existe", async()=>{
        // Given 
        const id = "id"
        // When 
        const result = await service.chercher(id);
        // Then
        expect(mockRecherche.mock.calls.length).toBe(1)
        expect(result._id).toBe(id)
    })



    describe("Recherche competences selon des competences",()=> {
        //T1 Retourne les competences passé en param
        //T2 [Option] Retroune les competences sans prereq
        //T3 Retourne l'ensembles des competences ayant les prereq
        //T4 Ne retourne pas ceux possédant pas les prereq
        //T5 pas de doublons 
    
    })

})