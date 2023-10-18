import React from 'react'

function About() {
    return (
        <>
            {document.title = "About Us - News Wallah"}
            <div className="container" style={{ padding: "5rem" }}>
                <div className="row">
                    <div className="col-4 text-center">
                        <img src="/logo512.png" className="rounded" alt="logo" style={{ width: '50%' }} />
                    </div>
                    <div className="col-8">
                        <h1 style={{ paddingBottom: "1rem" }}>About Us</h1>
                        <p >
                            Welcome to our news app! We are a team of dedicated journalists and developers who are passionate about bringing you the latest and most accurate news from around the world. Our app is designed to be fast, reliable, and easy to use, so you can stay informed on the go. We strive to provide a diverse range of perspectives on the stories that matter most to you, and we are committed to upholding the highest standards of journalism. Thank you for choosing our news app, and we hope you enjoy using it as much as we enjoyed creating it.
                        </p>
                        <p >
                            Our news app is designed to bring you the latest and most accurate news as soon as it hits the market. Whether you're interested in national and international news, politics, sports, business, or entertainment, we've got you covered.
                        </p>
                        <p >
                            Our app features a wide range of categories to choose from, so you can easily find the stories that matter most to you. Plus, our app is designed to be fast, reliable, and easy to use, so you can stay informed on the go. So why wait? Install our app today and stay up-to-date on the latest news and events from around the world.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
