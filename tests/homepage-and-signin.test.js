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

    // vérification du chargement du formulaire au clic sur sign in
    test('home and sign in', async () => {
        await page.goto('https://polr.stationmyr.net');
        await page.waitForSelector('#navbar li a');
        // click sur le lien "Sign In" de la navigation
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign In ')[0].click();
        });
        // on attent que l'élément ".dropdown" soit chargé
        await page.waitForSelector('.dropdown');
        await page.screenshot({path: './tests/img/signin.png'});
        // on récupère le code HTML
        const html = await page.$eval('.dropdown', e => e.innerHTML);
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(html).toContain("Login");
    }, timeout);

        // sign in avec identifiants admin
    test('sign in as admin', async () => {
        await page.goto('https://polr.stationmyr.net');
        await page.waitForSelector('#navbar li a');
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign In ')[0].click();
        });
        await page.waitForSelector('.login-form-field');
        await page.type('input[name="username"]', 'admin');
        await page.type('input[name="password"]', 'password');
        await page.screenshot({path: './tests/img/admin-inputs.png'});
        await page.click('.login-form-submit');
        const html = await page.$eval('.dropdown-toggle', e => e.innerHTML);
        expect(html).toContain("admin");
        await page.screenshot({path: './tests/img/admin-logged-success.png'});
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
