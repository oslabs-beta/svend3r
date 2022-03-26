<script context="module">
	export const prerender = true;
    import { slide } from 'svelte/transition'
    
    // let aboutMeOpen = true;

    // const toggler = () => {
    //     console.log("im clicked")
    //     if(aboutMeOpen === false) {
    //         console.log("im now true")
    //         return aboutMeOpen = true;
    //     } else {
    //         console.log("im now false")
    //         return aboutMeOpen = false;
    //     }
    // }

    const theTeam = [
        {
            first_name: "James",
            last_name: "Laff",
            title: "Software Engineer",
            alt_text: "james laff software engineer svend3r svender",
            aboutMe: "Zealous about Svelte becoming the new standard for web development. Developer of open-source products geared toward nurturing communities and seamlessly integrating technology into everyday life.",
            headshot: "/images/jameslaff_headshot.jpg",
            linkedIn: "https://www.linkedin.com/in/jameslaff/",
            github: "https://github.com/jameslaff",
        },
        {
            first_name: "Tao",
            last_name: "Chen",
            title: "Software Engineer",
            alt_text: "tao chen software engineer svend3r svender",
            aboutMe: "Ex-nuclear submarine engineer.  Experienced PM, recognized as a team leader and high individual performer with a creative vision.  Passionate about open-source projects and emerging technologies.",
            headshot: "/images/taochen_headshot.jpg",
            linkedIn: "https://www.linkedin.com/in/xtc2008/",
            github: "https://github.com/xtc2008",
        },
        {
            first_name: "Isaac",
            last_name: "Saunders",
            title: "Software Engineer",
            alt_text: "isaac saunders software engineer svend3r svender",
            aboutMe: "Former Chef passionate about the current and future role of web based technologies in the Food Service Industry and beyond. Excited about data visualization, accessibility and of course Svelte.",
            headshot: "/images/isaacsaunders_headshot.jpg",
            linkedIn: "https://www.linkedin.com/in/isaac-l-saunders/",
            github: "https://github.com/IsaacLSaunders",
        },
        {
            first_name: "Michael",
            last_name: "Lakeram",
            title: "Software Engineer",
            alt_text: "michael lakeram software engineer svend3r svender",
            aboutMe: "Hello my name is Michael.",
            headshot: "/images/taochen_headshot.jpg",
            linkedIn: "https://www.linkedin.com/in/michaellakeram/",
            github: "https://github.com/calamitymike",
        }
    ]
</script>

<div class="svend3r_team">
	<h1 class="team_title">Meet the Svend3r Team!</h1>
    <div class="contributor_cards">
        {#each theTeam as member}
        <div class="contributor_member" transition:slide>
            <img alt="Svend3r contributors" class="headshot" src={member.headshot}/>
            <div class="name_link_container">
                <section class="name_section">
                    <h2>{member.first_name}</h2>
                    <h2>{member.last_name}</h2>
                    <h3>{member.title}</h3>
                </section>
                <section class="link_section">
                    <a href={member.linkedIn}><img alt="linkedIn" class="headshot" src="/images/linkedin-icon.png"/></a>
                    <a href={member.github}><img alt="Github" class="headshot" src="/images/github-light.png"/></a>
                </section>
            </div>
            <hr
                class="border-line"
            />
            <div class="card_actions">
                <h4>About {member.first_name}:</h4>
                <!-- <button class="dropdown" type="button" on:click={toggler}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                    </svg>
                </button> -->
                <h5>{member.aboutMe}</h5>
            </div>
        </div>
        {/each}
    </div>
</div>

<style>
    .svend3r_team h1{
        justify-content: center;
        text-align: center;
        margin-top: 2vh;
        margin-bottom: 3vh;
        color: rgba(255, 255, 255, 0.87);
        font-size: 3em;
        font-weight: bold;
    }
    .svend3r_team h2{
        font-size: 1.5em;
        font-weight: bold;
    }

    .svend3r_team h3{
        font-size: 1em;
        color: rgba(100, 100, 100, 0.9);
    }

    .svend3r_team h5{
        font-size: 0.75em;
        color: rgba(100, 100, 100, 0.9);
    }

    .name_link_container{
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 4vw;
        margin-top: 1vw;
    }

    .name_section {
        margin-left: 0.5vw;
        width: 140px;
    }

    .link_section{
        display: flex;
    }

    .link_section img{
        width: 60px;
        margin-right: 10px;
        border-radius: 5px;
    }

    .svend3r_team{
        width: 100%;
        height: auto;
    }

    .contributor_cards{
        display: flex;
        width: 100%;
        overflow-x: auto;
        height: auto;
        justify-content: space-evenly;
    }

    .contributor_member{
        width: 300px;
        height: 550px;
        background-color: rgba(255, 255, 255, 0.87);
		border: 1px solid #aaa;
		border-radius: 5px;
        box-shadow: 4px 4px 12px rgba(0,0,0,0.9);
        margin: 0 10px;
        padding-bottom: 10px;
    }

    .border-line{
        margin-top: 2vh;
        background-color: rgba(0,0,0,0.9);
        border-radius: 1px;
        width: 100%;
        box-shadow: 0px 4px 10px black;
    }

    .card_actions{
        align-content: center;
        margin: 0 0.5vw;
        margin-top: 0.5vh;
    }

    .headshot{
        width: fit-content;
        height: fit-content;
    }

	@media (max-width: 1420px) {
        .contributor_cards{
            justify-content: flex-start;
            padding-bottom: 20px;
        }
	}
</style>