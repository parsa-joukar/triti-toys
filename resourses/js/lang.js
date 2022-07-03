let checkLang = "FA"; // default lang of website
const switchLang = document.querySelector("#language-toggle");
const titleParent = document.querySelectorAll(".face__3");
const titleContainer = document.querySelectorAll(".title");
const aboutUsCube = document.querySelectorAll(".about-us");
const aboutUsTitle = document.querySelectorAll(".about-us-title");
const aboutUsInfo = document.querySelectorAll(".about-us-info");
let FaTitle = titleContainer[0].innerHTML;
let EnTitle = "Features:";

// z4
const zcontainer = document.querySelector(".z4-container");
const zInfo = zcontainer.querySelector(".information");
let FAZ = zInfo.innerHTML;
let EnZ =
  "A beautiful and powerful machine with attractive appearance, Friction powered engine and elastic tires. Distinguished choice as a toy car. <br> Package Dimension: 340*200*170 mm \n Product Dimension: 310*150*88 mm";

// happy truck
const happyTruckcontainer = document.querySelector(".happytruck-container");
const happyTruckInfo = happyTruckcontainer.querySelector(".information");
let FAHappyTruck = happyTruckInfo.innerHTML;
let EnHappyTruck =
  "Cute Equipment for Little Engineers. A set including of 4 types of construction machinery with childish design: Dumper, Loader, Mixer, Crane!. <br> Package Dimension: 120*75*100 mm each \n Product Dimension: 385*280*115 mm";

// happy truck
const FancyParkcontainer = document.querySelector(".fancy-park-container");
const FancyParkInfo = FancyParkcontainer.querySelector(".information");
let FAFancyPark = FancyParkInfo.innerHTML;
let EnFancyPark =
  "A fabulous carriage that can be turned into a Fancy park for puppy dolls inside it and an amazing toy. <br> Product Dimension: 270*210*90 mm ";

  //batman
const batmancontainer = document.querySelector(".batman-container");
const batmanInfo = batmancontainer.querySelector(".information");
let FABatman = batmanInfo.innerHTML;
let EnBatman =
  "Comic book hero put in an armor to save the world from chaos. Armored batman, a special figure, a unique hero.\nPackage Dimension: 265*190*360 mm \n Product Dimension: 140*60*315 mm";

//making 4
const makeKingcontainer = document.querySelector(".makeking4-container");
const makeKingInfo = makeKingcontainer.querySelector(".information");
let FAMakeKing = makeKingInfo.innerHTML;
let EnMakeKing =
  "Throw the balls to the goals and win. This thrilling game can bring a lot of laugh and joy to you with your friends and family.\nDimension: 430*300*60 mm";

//trtrike
const tritrikecontainer = document.querySelector(".tritrike-container");
const tritrikeInfo = tritrikecontainer.querySelector(".information");
let FATriTrike = tritrikeInfo.innerHTML;
let EnTriTrike =
  "TriTrike is a three wheeled motorcycle with friction powered engine in variety of colors.\nPackage dimension: 300*130*198 mm\nProduct Dimension: 295*110*160 mm";

//about us
let FAAboutUs = aboutUsInfo[0].innerHTML;
let EnAboutUs =
  "In Triti Toys, we tend to provide a variety of products to our audiences by providing high quality at a reasonable price and We believe that in our well-equipped and up-to-date factory, with the efforts of the production sector and the pursuit and will of our colleagues, this is achievable.";

//OUR history
let FAOurHistory = aboutUsInfo[1].innerHTML;
let EnOurHistory =
  "Zartosht mercantile holding has been focused on selecting toy products with high quality to present to the local market for many years. Over 20 years of effort in this field has provided us a valuable experience of being aware of the tastes of the audiences, and high-quality standards. And today in the field of production, these experiences will help us to provide high-quality and elegant products.";

//Address
let FAAddress = aboutUsInfo[2].innerHTML;
let EnAddress = "11th block, 2nd phase, Ekbatan town, Tehran, Iran";

switchLang.addEventListener(
  "click",
  function () {
    if (checkLang == "EN") {
      checkLang = "FA";
    } else if (checkLang == "FA") {
      checkLang = "EN";
    }
    changeLang(checkLang);
  },
  false
);

function changeLang(lang) {
  if (lang == "EN") {
    for (let i = 0; i < titleContainer.length; i++) {
      titleContainer[i].innerHTML = EnTitle;
      titleParent[i].style.textAlign = "left";
      aboutUsCube[i].style.textAlign = "left";
    }
    zInfo.innerHTML = EnZ;
    happyTruckInfo.innerHTML = EnHappyTruck;
    batmanInfo.innerHTML = EnBatman;
    makeKingInfo.innerHTML = EnMakeKing;
    tritrikeInfo.innerHTML = EnTriTrike;
    aboutUsTitle[0].innerHTML = "About Us";
    aboutUsTitle[1].innerHTML = "Our History";
    aboutUsTitle[2].innerHTML = "Address";
    aboutUsInfo[0].innerHTML = EnAboutUs;
    aboutUsInfo[1].innerHTML = EnOurHistory;
    aboutUsInfo[2].innerHTML = EnAddress;
  } else if (lang == "FA") {
    for (let i = 0; i < titleContainer.length; i++) {
      titleContainer[i].innerHTML = FaTitle;
      titleParent[i].style.textAlign = "right";
      aboutUsCube[i].style.textAlign = "right";
    }
    zInfo.innerHTML = FAZ;
    happyTruckInfo.innerHTML = FAHappyTruck;
    batmanInfo.innerHTML = FABatman;
    makeKingInfo.innerHTML = FAMakeKing;
    tritrikeInfo.innerHTML = FATriTrike;

    aboutUsTitle[0].innerHTML = "درباره ما";
    aboutUsTitle[1].innerHTML = "تاریخچه ما";
    aboutUsTitle[2].innerHTML = "آدرس";
    aboutUsInfo[0].innerHTML = FAAboutUs;
    aboutUsInfo[1].innerHTML = FAOurHistory;
    aboutUsInfo[2].innerHTML = FAAddress;
  }
}
