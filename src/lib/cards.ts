export type Flashcard = {
  keyword: string;
  hint?: string;
};

export const cards: Flashcard[] = [
  {
    keyword: "Elke feed heeft een algoritme",
    hint: "Ook een chronologische tijdlijn. Vraag is nooit óf, maar waaróp het optimaliseert en wie het dient.",
  },
  {
    keyword: "X tegenover onafhankelijke journalistiek",
    hint: "Je verdient aan je eigen bereik → geen prikkel anderen groot te maken. Aandacht = advertenties → optimaliseren voor schermtijd.",
  },
  {
    keyword: "Niet kwaadaardig, gewoon de bouw",
    hint: "Het algoritme doet precies waar het voor gebouwd is. Gevolg: meer polarisatie, meer viraliteit, onafhankelijke makers verdwijnen onder de ruis.",
  },
  {
    keyword: "Substack heeft een andere prikkel",
    hint: "Zij verdienen pas als de schrijver verdient. Niet schermtijd, maar abonnementen.",
  },
  {
    keyword: "Jairaj — Substack CTO",
    hint: "\"Het gaat niet om goed of slecht, het gaat om de objective function.\" Welke variabele vind je het belangrijkst.",
  },
  {
    keyword: "Hun eigen experiment",
    hint: "Scrolltijd omhoog → werkte → teruggedraaid. Mensen abonneerden zich daarna mínder. Zelfde data, andere objective function, andere uitkomst.",
  },
  {
    keyword: "Algoritmes zijn niet neutraal",
    hint: "Maar ook niet magisch. Ze volgen gewoon de prikkelstructuur die wij erin stoppen.",
  },
  {
    keyword: "Zelfs mét de juiste prikkel gaat het mis",
    hint: "Lees de comments onder Substacks eigen uitleg: honderden kleinere schrijvers zeggen \"m'n groei is stilgevallen\", \"de feed beloont grote namen\".",
  },
  {
    keyword: "Populariteit = centralisatie",
    hint: "Zodra je optimaliseert op overlap en populariteit → zwaartekracht richting de grootste spelers. Juiste objective function is nodig, maar niet genoeg.",
  },
  {
    keyword: "De echte vraag",
    hint: "Hoe bouw je een engine die niet op schermtijd stuurt, maar op duurzame relaties tussen lezer en schrijver — én ruimte houdt voor nichekwaliteit?",
  },
  {
    keyword: "Niet alleen journalisten",
    hint: "Ook kleine publicaties als Vers Beton of Woeste Grond — goede journalistiek die op grote platforms wegzakt onder de toppers.",
  },
  {
    keyword: "Open en in Europese handen",
    hint: "Infrastructuur bepaalt wie de macht heeft. Daar is nog geen goed antwoord op. Dat willen wij uitzoeken.",
  },
  {
    keyword: "Wat we bouwen",
    hint: "Een open, EU-hosted recommendation engine voor onafhankelijke journalistiek. Geen platform dat alles bezit — een voorzet op een infrastructuurlaag.",
  },
  {
    keyword: "Downside is klein",
    hint: "Slaat het niet aan? Dan ligt er nog steeds een open-source engine die iemand anders kan oppakken.",
  },
  {
    keyword: "Grotendeels dezelfde machine als Substack",
    hint: "Embeddings, candidate retrieval, ranking, audience overlap, personalisatie. Geen nieuwe magie.",
  },
  {
    keyword: "Het verschil — drie dingen",
    hint: "1) Optimaliseren op de relatie, niet op schermtijd. 2) Tegengewichten tegen populariteitsbias. 3) Open, transparant, Europees eigenaarschap.",
  },
  {
    keyword: "Hóe we het bouwen",
    hint: "Niet top-down te ontwerpen — een aanbevelingssysteem ontstaat uit gedrag. Stap voor stap, elke stap levert de data die de volgende nodig heeft.",
  },
  {
    keyword: "Stap 1 — de directory",
    hint: "Chronologisch, geen ranking. Substacks eigen bouwers zeggen dat dat prima werkt als start.",
  },
  {
    keyword: "We beginnen niet bij nul",
    hint: "Die directory hébben we al: onafhankelijke NL makers van Substack, Ghost, losse auteurs én kleine publicaties. Dag één draait op echte content en echte lezers.",
  },
  {
    keyword: "Stap 2 — de restack",
    hint: "Gewoon een doorgeefknop. Doet twee dingen tegelijk: distributie (mijn lezers zien het) én signaal (dít is goed).",
  },
  {
    keyword: "Onder water — een kaart",
    hint: "Welke schrijvers delen publiek, welke niches raken elkaar, welke lezers keren terug. Beginpunt voor alles erna.",
  },
  {
    keyword: "Stap 3 — voorzichtig ranken",
    hint: "Eerst extreem simpel: likes + shares gedeeld door tijd sinds posten. Daarna een lichte personalisatie-slag.",
  },
  {
    keyword: "Stap 4 — modellen",
    hint: "Niet op abonnementen (te zeldzaam op onze schaal). Op iets interessanters: komt een lezer terug bij dezelfde schrijver? Dát voorspelt een toekomstige abonnementsrelatie.",
  },
  {
    keyword: "Werkt het? Who knows",
    hint: "Waarschijnlijk zelf niet. En tóch doen we het.",
  },
  {
    keyword: "Wat we meten",
    hint: "Niet alleen conversie. Ook: blijven nieuwe stemmen zichtbaar, blijft de niche vindbaar? Anders is het mislukt — ook als engagement stijgt.",
  },
  {
    keyword: "Bewust op één plek testen",
    hint: "Eén feed, kleine gecontroleerde experimenten, één variabele tegelijk. Alleen zo kun je een effect echt toeschrijven.",
  },
  {
    keyword: "Bewust eindige feed",
    hint: "Geen infinite scroll. We kiezen voor de lezer, niet voor schermtijd.",
  },
  {
    keyword: "De vraag aan NRC",
    hint: "In een paar maanden bouwen we met deze groep een knettergoed product dat dit algoritme support.",
  },
  {
    keyword: "Stel dat we kunnen laten zien",
    hint: "Lezers vinden betere onafhankelijke journalistiek, schrijvers bouwen duurzamere relaties, de niche blijft zichtbaar.",
  },
  {
    keyword: "Willen jullie het één keer echt met ons testen?",
    hint: "Het bewijs op kleine schaal leveren wij eerst. Maar testen met NRC — dat zou echt vet zijn.",
  },
];
