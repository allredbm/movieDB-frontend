class Movie {
    _id: string;
	title: string;
	genre: number;
    description: string;
    dateMade: Date;
    link: string;
    seen: boolean;

    constructor(){
        this.title = ""
        this.genre = null
        this.description = ""
        this.dateMade = null
        this.link = ""
        this.seen = false
    }
}

export default Movie;