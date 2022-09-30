import { Injectable } from "@nestjs/common";
import { Node } from "./node";
import { Tree } from "./tree";
@Injectable()
export class GP {
    popsize : number;
    generations : number;
    fittest : Node;

    population : Node[];
    genTree : Tree;
    inputs : number[][];


    constructor(popsize : number,depth : number,generations : number,inputs : number[][],expected: number[]){
        this.genTree = new Tree(depth,inputs,expected);
        this.population = [];
        this.popsize = popsize;
        this.generations = generations;
    
    }

    async getInitial() : Promise<void>{
        for(let i=0;i<this.popsize;i++){
            this.population[i] = await this.genTree.generateRandTree();
            this.population[i].setFitness(await this.genTree.getFitness(this.population[i]));
        }
    }

    async GPA() : Promise<Node>{
        await this.getInitial();
        let highest: Node = null;
        let countgen = 0;
        
        highest = await (await this.getBestFitness()).clone();
        while(await highest.getFitness() < 100.0 && countgen < this.generations){
            //generate new popluation
            const newpopulation: Node[] = [];
            const half = Math.floor(this.population.length /2);
            
            for(let i=0;i<half;i+=2){
                let children:Node[] = [];
                children = await this.genTree.crossOver(this.population[0],this.population[i+1]);
                
                newpopulation.push(children[0]);
                newpopulation.push(children[1]);

            }

            for(let i=half;i<this.population.length;i++){
                newpopulation.push(await this.genTree.mutation(this.population[i],2));
            }

            for(let f=0;f<newpopulation.length;f++){
                newpopulation[f].setFitness(await this.genTree.getFitness(newpopulation[f]));
            
            }

            this.population = newpopulation;
            this.population = await this.insertionSort(this.population);
            
            if(await this.population[0].getFitness()>await highest.getFitness()){
                highest=await this.population[0].clone();
            }
            countgen++;
        }
        console.log("The highest fitness: "+highest.getFitness());
        return highest;
    }

    async insertionSort(inputArr : Node[]) {
        const n = inputArr.length;
            for (let i = 1; i < n; i++) {
                
                const current: Node = inputArr[i];
                
                let j = i-1; 
                while ((j > -1) && (await current.getFitness() < await inputArr[j].getFitness())) {
                    inputArr[j+1] = inputArr[j];
                    j--;
                }
                inputArr[j+1] = current;
            }
        return inputArr;
    }

    async getBestFitness() : Promise<Node>{
        this.population = await this.insertionSort(this.population);
        return this.population[0];
    }



}

