export class FireWorks{
    private matrix:{intensity: number}[] = [];
    private width = 0;
    private height = 0;
    constructor({width, height}:FireWorks){
        this.width = width;
        this.height = height;
        this.populateMatrix();
        this.createFireSource();
    }
    attached(){
        setInterval(this.calcFirePropagation.bind(this), 60);
    }
    private createFireSource(){
        let {width, matrix, height} = this;
        const length =  width * height;
        for(let col = 0; col < width; col++){
            const cellIndx = (length - width) + col;
            matrix[cellIndx].intensity = 36;
        }
        this.matrix = matrix;
    }
    private calcFirePropagation(){
        let {width, matrix, height} = this;
        const length =  width * height;
        for(let col = 0; col < width; col++){
            for(let row = 0; row < height; row++){
                const cellIndx = col + (width * row);
                const belowCellIndx = cellIndx + width;
                const decay = Math.floor(Math.random() * 3);
                const decayIndx = cellIndx - decay;
                if(belowCellIndx < length && decayIndx > -1){
                    const belowPixelFireIntensity = matrix[belowCellIndx].intensity;
                    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;
                    matrix[decayIndx].intensity = newFireIntensity;
                }
            }
        }
        this.matrix = matrix;
    }
    private populateMatrix(){
        const length = this.width * this.height;
        for(let i = 0; i < length ; i++){
            this.matrix.push({intensity:0});
        }
    }
}