// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


const pAequorFactory = (specimenNum) => {
  // let base = returnRandBase();
  let strand  = mockUpStrand()
  return {
    specimenNum,
    strand,
    mutate() {
      let randInt = Math.floor(Math.random() * 15);
      let randChangeBase = returnRandBase();
      if (this.strand[randInt] != randChangeBase) {
        this.strand[randInt] = randChangeBase;
        return strand;
      }
      this.mutate();
    },
    compareDNA(otherSpecimen) {
      let sameBases = []
      for (let i = 0; i < 15; i++) {
        if (this.strand[i] == otherSpecimen.strand[i]) {
          sameBases.push(this.strand[i])
        }
      }
      let percentage = Math.round((sameBases.length / 15) * 100);
      console.log(`Specimen ${this.specimenNum} and specimen ${otherSpecimen.specimenNum} have ${percentage}% DNA in common.`)
    },
    willLikleySurvive() {
      let cAndGs = [];
      for (let i = 0; i < 15; i++) {
        if (this.strand[i] === 'C' || this.strand[i] == "G") {
          cAndGs.push(this.strand[i])
        }
      }
      if (cAndGs.length >= 9) {
        return true
      } else {
        return false
      }
    }
  }
}

const createSurvivals = () => {
  let survivals = [];
  let count = 1;
  while (survivals.length < 30) {
    let instance = pAequorFactory(count);
    if (instance.willLikleySurvive()) {
      survivals.push(instance)
      count ++
    }
  }
  return survivals
}


console.log((createSurvivals()))
