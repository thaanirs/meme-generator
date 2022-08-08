import React from "react";

class MemeGenarator extends React.Component {

    constructor() {
        super()
        this.state = {
            topText: "one does not simply walk ",
            bottomText: "into mordor",
            allMemeImgs: [],
            randomImg: "http://i.imgflip.com/1bij.jpg"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        console.log("working")
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        const randnum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        let image = this.state.allMemeImgs[randnum].url
        this.setState({ randomImg: image })
        // console.log("image",image)
    }

    componentDidMount() {
        // API call 
        // api link https://api.imgflip.com/get_memes

        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log("response API meme is")
                console.log(memes)
                this.setState({ allMemeImgs: memes })
            })

    }



    render() {

        return (
            <div>
                {/* <h1>MemeGenarator</h1> */}
                <form className="meme-form" onSubmit={this.handleSubmit}>

                    <label>
                        {/* Top Text  */}
                        <input
                            type="text"
                            placeholder="Top Text"
                            name="topText"
                            onChange={this.handleChange}
                            value={this.state.topText}
                        />
                    </label>
                    <label>
                        {/* Bottom Text  */}
                        <input
                            type="text"
                            placeholder="Bottom Text"
                            name="bottomText"
                            onChange={this.handleChange}
                            value={this.state.bottomText}
                        />
                    </label>
                    <button>Generate Meme</button>
                </form>
                <div className="meme">
                    <img
                        alt="meme"
                        src={this.state.randomImg}

                    />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenarator