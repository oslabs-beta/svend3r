<script>
	export let chartCard;
</script>

<div class="card-container">
	<h1 class="cardTitle"><b>{chartCard.title}</b></h1>
		<section class=cardSvg>
			<!-- <Choropleth /> -->
			<a href='/charts/{chartCard.icon}' ><img class=cardSvg src="/main/{chartCard.icon}-main.png" alt={chartCard.title} /></a>
		</section>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
	
	.card-container{
		width: 16vw;
		height: 11.5vw;
        border-radius: 5%;
        box-shadow: 0.3vw 0.3vw .5vw rgb(121, 119, 119);
		background: #343434;
        color: rgba(255, 255, 255, 0.87);
	}

    .card-container:hover {
        background: rgba(255, 255, 255, 0.87);
        color: #343434;
        -o-transition:color 1s ease-out, background 1s ease-in;
        -ms-transition:color 1s ease-out, background 1s ease-in;
        -moz-transition:color 1s ease-out, background 1s ease-in;
        -webkit-transition:color 1s ease-out, background 1s ease-in;
        transition:color 1s ease-out, background 1s ease-in;
    }

	.cardTitle{
		width: 100%;
		height: 18.18%;
		margin: 0px 1vw;
        font-family: 'Roboto', sans-serif;
		font-size: 1vw;
        display: flex;
        justify-content: left;
        align-items: center;
	}

	.cardSvg{
		height: 85%;
		margin: auto;
	}
	
</style>