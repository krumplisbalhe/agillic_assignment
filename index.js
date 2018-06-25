const link = "http://api.tvmaze.com/singlesearch/shows?q=mr-robot&embed=episodes";
const maindiv = document.createElement("div");
maindiv.setAttribute('class', 'main');
document.getElementById("application-root").appendChild(maindiv);

function getData(link) {
    fetch(link)
        .then(res => res.json())
        .then(show);
}

function addElement(element, textNode, className) {
    const el = document.createElement(element);
    const tn = document.createTextNode(textNode);
    el.appendChild(tn);
    el.setAttribute('class', className);
    maindiv.appendChild(el);
}

function show(json) {
    console.log(json);
    const mainimg = document.createElement("img");
    mainimg.setAttribute('class', 'mainimg');
    mainimg.src = json.image.medium;
    maindiv.appendChild(mainimg);

    addElement("H1", json.name, "title");
    addElement("H2", "Genres: " + json.genres.join(', '), "genres");
    addElement("H2", "Rating: " + Math.round(json.rating.average) + "/10", "rating");
    addElement("P", json.summary.replace(/<.*?>/gm, ''), "description");
    addElement("H1", "Episodes", "episodes");

    for (let e of json._embedded.episodes) {
        const newElement = document.createElement('img');
        newElement.setAttribute('class', 'episodeimg');
        newElement.src = e.image.medium;
        maindiv.appendChild(newElement);

        addElement("H2", "S" + ("0" + e.season).slice(-2) + "E" + ("0" + e.number).slice(-2) + ": " + e.name, "episodedescription");
    }
}
getData(link);