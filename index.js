const link = "http://api.tvmaze.com/singlesearch/shows?q=mr-robot&embed=episodes";

const maindiv = document.createElement("div");
maindiv.setAttribute('class', 'main');
document.getElementById("application-root").appendChild(maindiv);

function getData(link) {
    fetch(link)
        .then(res => res.json())
        .then(show);
}

function addTextElement(element, textNode, className) {
    const el = document.createElement(element);
    const tn = document.createTextNode(textNode);
    el.appendChild(tn);
    el.setAttribute('class', className);
    maindiv.appendChild(el);
}

function show(json) {
    const mainimg = document.createElement("img");
    mainimg.setAttribute('class', 'mainimg');
    mainimg.src = json.image.medium;
    maindiv.appendChild(mainimg);

    addTextElement("H1", json.name, "title");
    addTextElement("H3", "{Genres}: " + json.genres.join(', '), "genres");
    addTextElement("H3", "{Rating}: " + Math.round(json.rating.average) + "/10", "rating");
    addTextElement("P", json.summary.replace(/<.*?>/gm, ''), "description");
    addTextElement("H2", "Episodes", "episodes");

    for (let e of json._embedded.episodes) {
        const container = document.createElement("div");
        container.setAttribute('class', 'container');
        document.querySelector(".main").appendChild(container);

        const newElement = document.createElement('img');
        newElement.setAttribute('class', 'episodeimg');
        newElement.src = e.image.medium;
        container.appendChild(newElement);

        const episodeinfo = document.createElement("H3")
        episodeinfo.setAttribute('class', 'episodedescription');
        const t6 = document.createTextNode("{S}" + ("0" + e.season).slice(-2) + "{E}" + ("0" + e.number).slice(-2) + ": " + e.name);
        episodeinfo.appendChild(t6);
        container.appendChild(episodeinfo);
    }

    function bolderize(el) {
        el.innerHTML = el.innerHTML.replace(/{([^}]+)}/gm, '<strong>$1</strong>')
    }
    bolderize(document.querySelector('.main'));
}
getData(link);

function font() {
    const wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
};

WebFontConfig = {
    google: {
        families: ['Roboto']
    }
};