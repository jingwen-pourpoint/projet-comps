import { CompetenceRepository } from './../repositories/CompetenceRepository';
import { Competence } from './../entities/Competence';


export class CompetenceService {

    public constructor(private repository:CompetenceRepository){}



    public sauvegarder(competence:Competence): Promise<Competence>{
        if(competence.nom.length > 50) throw new Error();
        return this.repository.sauvegarder(competence)
    }

    public async chercher(id: string):Promise<Competence> {
        return this.repository.rechercher(id)
    }

    public async rechercheAccessible(niveauComps:{niveau:number, comp:Competence}[]):Promise<Competence[]>{
        return[]
    }

}

// export const competenceService = Object.freeze(new CompetenceService())