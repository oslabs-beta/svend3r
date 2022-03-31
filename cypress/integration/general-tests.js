/// <reference types="cypress" />

// note: intentionally avoiding using loops incase a test fails and more paramets need to be added to any one specific test

describe('API-routes test', () => {
  it('successfully resolves to "/" ', () => {
    cy.visit('http://localhost:8080/');
  });

  it('successfully resolves to "/gettingStarted" ', () => {
    cy.visit('http://localhost:8080/gettingStarted');
  });

  it('successfully resolves to "/contributors" ', () => {
    cy.visit('http://localhost:8080/contributors');
  });

  it('successfully resolves to "/charts/area" ', () => {
    cy.visit('http://localhost:8080/charts/area');
  });

  it('successfully resolves to "/charts/area" ', () => {
    cy.visit('http://localhost:8080/charts/area');    
  });

  it('successfully resolves to "/charts/bar" ', () => {
    cy.visit('http://localhost:8080/charts/bar');    
  });

  it('successfully resolves to "/charts/bubble" ', () => {
    cy.visit('http://localhost:8080/charts/bubble');    
  });

  it('successfully resolves to "/charts/chord" ', () => {
    cy.visit('http://localhost:8080/charts/chord');    
  });

  it('successfully resolves to "/charts/choropleth" ', () => {
    cy.visit('http://localhost:8080/charts/choropleth');    
  });

  it('successfully resolves to "/charts/circlePack" ', () => {
    cy.visit('http://localhost:8080/charts/circlePack');    
  });

  it('successfully resolves to "/charts/donut" ', () => {
    cy.visit('http://localhost:8080/charts/donut');  
  });

  it('successfully resolves to "/charts/line" ', () => {
    cy.visit('http://localhost:8080/charts/line');    
  });

  it('successfully resolves to "/charts/radialStacked" ', () => {
    cy.visit('http://localhost:8080/charts/radialStacked');
  });

  it('successfully resolves to "/charts/ridgeline" ', () => {
    cy.visit('http://localhost:8080/charts/ridgeline');
  });

  it('successfully resolves to "/charts/scatter" ', () => {
    cy.visit('http://localhost:8080/charts/scatter');  
  });

  it('successfully resolves to "/charts/pie" ', () => {
    cy.visit('http://localhost:8080/charts/pie');  
  });
});


// describe('Homepage sidebar and navbar links', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:8080/');
//   });

//   it('render area charts from sidebar icon', () => {
//     cy.get('nav > :nth-child(5)').click();
//   });

//   it('render bar chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(6)').click();
//   });

//   it('render bubble chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(7)').click();
//   });

//   it('render chord chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(8)').click();
//   });

//   it('render choropleth chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(9)').click();
//   });

//   it('render circle pack chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(10)').click();
//   });

//   it('render donut chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(11)').click();
//   });

//   it('render line chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(12)').click();
//   });

//   it('render radial chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(13)').click();
//   });

//   it('render ridgeline chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(14)').click();
//   });

//   it('render scatter plot chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(15)').click();
//   });

//   it('render pie chart from sidebar icon', () => {
//     cy.get('nav > :nth-child(16)').click();
//   });

//   it('redirects to github repo', () => {
//     cy.get('#widget > a.s-OTmmHBhb3fXp').click();
//   });
  
//   it('redirects to github star gazers', () => {
//     cy.get('#star-count').click();
//   });
// });

// describe('Homepage main links', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:8080/')
//   })

//   it('render area charts from homepage image', () => {
//     cy.get(':nth-child(1) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render bar charts from homepage image', () => {
//     cy.get(':nth-child(2) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render bubble charts from homepage image', () => {
//    cy.get(':nth-child(3) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render chord charts from homepage image', () => {
//     cy.get(':nth-child(4) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render choropleth charts from homepage image', () => {
//    cy.get(':nth-child(5) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render circle pack charts from homepage image', () => {
//     cy.get(':nth-child(6) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render donut charts from homepage image', () => {
//    cy.get(':nth-child(7) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render line charts from homepage image', () => {
//     cy.get(':nth-child(8) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render radial charts from homepage image', () => {
//    cy.get(':nth-child(9) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render ridgeline charts from homepage image', () => {
//     cy.get(':nth-child(10) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render scatter plot charts from homepage image', () => {
//     cy.get(':nth-child(11) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })

//   it('render pie charts from homepage image', () => {
//    cy.get(':nth-child(12) > .single-card-container > section.cardSvg > a.s-26GQofvqM1w4 > .cardSvg').click()
//   })
// })




