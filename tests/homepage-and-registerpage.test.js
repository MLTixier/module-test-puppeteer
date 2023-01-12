const timeout = 15000;

// série de tests sur la page register / sign up
describe("Tests basiques", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('home', async () => {
        // charger la page d'accueil
        await page.goto('https://polr.stationmyr.net/');
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
        // vérifier que dans cet élément Body on trouve "Shorturl"
        await page.screenshot({path: './tests/img/basic-home.png'});
        expect(html).toContain("Shorturl")
    }, timeout);

    // parcours client avec sign up
    test('home and sign up', async () => {
        await page.goto('https://polr.stationmyr.net');
        await page.waitForSelector('#navbar li a');
        // click sur le lien "Sign Up" de la navigation
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign Up')[0].click();
        });
        // on attent que l'élément ".title" soit chargé
        await page.waitForSelector('.title');
        await page.screenshot({path: './tests/img/signup.png'});
        // on récupère le code HTML
        const html = await page.$eval('.title', e => e.innerHTML);
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(html).toContain("Register");
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
