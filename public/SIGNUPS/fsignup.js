const stateSelect = document.getElementById("state");
const districtSelect = document.getElementById("district");
const mandalSelect = document.getElementById("mandal");
const villageSelect = document.getElementById("village");

const districts = {
    "Andhra Pradesh": [
        "Srikakulam", 
        "Vizianagaram", 
        "Parvathipuram Manyam", 
        "Alluri Sitharama Raju", 
        "Visakhapatnam", 
        "Anakapalli",
        "Kakinada", 
        "Dr. B. R. Ambedkar Konaseema", 
        "East Godavari", 
        "West Godavari", 
        "Eluru", 
        "Krishna", 
        "NTR", 
        "Guntur", 
        "Palnadu", 
        "Bapatla", 
        "Prakasam", 
        "Sri Potti Sriramulu Nellore",
        "Kurnool", 
        "Nandyal", 
        "Anantapuramu", 
        "Sri Sathya Sai", 
        "YSR", 
        "Annamayya", 
        "Tirupati", 
        "Chittoor"
    ],
    "Telangana": [
        "Adilabad",
        "Bhadradri Kothagudem",
        "Hyderabad",
        "Jagitial",
        "Jangaon",
        "Jayashankar Bhupalapally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Kumarambheem Asifabad",
        "Mahabubabad",
        "Mahabubnagar",
        "Mancherial district",
        "Medak",
        "Medchal–Malkajgiri",
        "Mulugu",
        "Nagarkurnool",
        "Narayanpet",
        "Nalgonda",
        "Nirmal",
        "Nizamabad",
        "Peddapalli",
        "Rajanna Sircilla",
        "Ranga Reddy",
        "Sangareddy",
        "Siddipet",
        "Suryapet",
        "Vikarabad",
        "Wanaparthy",
        "Warangal Rural",
        "Warangal Urban",
        "Yadadri Bhuvanagiri"
    ],
};

const mandals = {
    "Adilabad": [
        "Adilabad Rural",
        "Adilabad Urban",
        "Bazarhatnoor",
        "Bela",
        "Boath",
        "Bheempoor",
        "Gudihathnur",
        "Ichoda",
        "Jainad",
        "Mavala",
        "Neradigonda",
        "Sirikonda",
        "Talamadagu",
        "Tamsi",
        "Utnoor"
    ],
    "Bhadradri Kothagudem": [
        "Allapalli",
        "Annapureddypally",
        "Aswaraopeta",
        "Chandrugonda",
        "Chunchupally",
        "Dammapeta",
        "Gundala",
        "Julurpad",
        "Kothagudem",
        "Laxmidevipalli",
        "Mulakalapalle",
        "Palvancha",
        "Sujathanagar",
        "Tekulapalle",
        "Yellandu"
    ],
    "Hyderabad": [
        "Amberpet",
        "Asif Nagar",
        "Bahadurpura",
        "Bandlaguda",
        "Charminar",
        "Golkonda",
        "Himayathnagar",
        "Nampally",
        "Saidabad"
    ],
    "Jagitial": [
        "Beerpur",
        "Buggaram",
        "Dharmapuri",
        "Gollapalle",
        "Jagtial",
        "Jagtial Rural",
        "Kodimial",
        "Mallial",
        "Pegadapalle",
        "Raikal",
        "Sarangapur",
        "Velgatoor"
    ],
    "Jangaon": [
        "Bachannapeta",
        "Devaruppala",
        "Jangaon",
        "Lingalaghanpur",
        "Narmetta",
        "Raghunathapalle",
        "Tharigoppula"
    ],
    "Jayashankar Bhupalapally": [
        "Bhupalpalle",
        "Chityal",
        "Ghanpur",
        "Kataram",
        "Mahadevpur",
        "Maha Mutharam",
        "Malharrao",
        "Mogullapalle",
        "Palimela",
        "Regonda",
        "Tekumatla"
    ],
    "Jogulamba Gadwal": [
        "Kaloor_Timmanadoddi",
        "Dharur",
        "Gadwal",
        "Itikyal",
        "Maldakal",
        "Ghattu",
        "Aiza",
        "Rajoli",
        "Waddepalle",
        "Manopad",
        "Undavelli",
        "Alampur"
    ],
    "Kamareddy": [
        "Banswada",
        "Bichkunda",
        "Birkoor",
        "Jukkal",
        "Madnur",
        "Nasurullabad",
        "Nizamsagar",
        "Pedda Kodapgal",
        "Pitlam",
        "Dongli"
    ],
    "Karimnagar": [
        "Chigurumamidi",
        "Choppadandi",
        "Gangadhara",
        "Ganneruvaram",
        "Karimnagar",
        "Karimnagar (Rural-I)",
        "Karimnagar (Rural-II)",
        "Manakondur",
        "Ramadugu",
        "Thimmapur"
    ],
    "Khammam": [
        "Enkuru",
        "Kalluru",
        "Penuballi",
        "Sathupalli",
        "Thallada",
        "Vemsoor"
    ],
    "Kumuram Bheem Asifabad": [
        "Asifabad",
        "Jainoor",
        "Kerameri",
        "Lingapur",
        "Rebbena",
        "Sirpur_U",
        "Tiryani"
    ],
    "Mahabubabad": [
        "Bayyaram",
        "Dornakal",
        "Ganagavaram",
        "Garla",
        "Gudur",
        "Kesamudram",
        "Kothaguda",
        "Kuravi",
        "Mahabubabad",
        "Seerole",
        "Inugurthy"
    ],
    "Mahabubnagar": [
        "Addakal",
        "Balanagar",
        "Bhoothpur",
        "Chinna_Chintha_Kunta",
        "Devarkadara",
        "Gandeed",
        "Hanwada",
        "Jadcherla",
        "Koilkonda",
        "Mahabubnagar_Rural",
        "Mahabubnagar_Urban",
        "Midjil",
        "Mohammadabad",
        "Musapet",
        "Nawabpet",
        "Rajapur"
    ],
    "Mancherial": [
        "Bheemaram",
        "Chennur",
        "Dandepally",
        "Hajipur",
        "Jaipur",
        "Jannaram",
        "Kotapally",
        "Luxettipet",
        "Mancherial",
        "Mandamarri",
        "Naspur"
    ],
    "Medak": [
        "Alladurg",
        "Havelighanpur",
        "Medak",
        "Nizampet",
        "Papannapet",
        "Ramayampet",
        "Regode",
        "Shankarampet_A",
        "Shankarampet_R",
        "Tekmal"
    ],
    "Medchal-Malkajgiri": [
        "Dundigal Gandimaisamma",
        "Kukatpally",
        "Malkajgiri",
        "Quthbullapur"
    ],
    "Mulugu": [
        "Eturnagaram",
        "Govindaraopet",
        "Kannaigudem",
        "Mangapet",
        "Mulugu",
        "Sammakka Saralamma Tadvai",
        "Venkatapur",
        "Venkatapuram",
        "Wazeed"
    ],
    "Nagarkurnool": [
        "Achampet",
        "Amrabad",
        "Balmoor",
        "Lingal",
        "Padra",
        "Uppunuthala",
        "Tadoor"
    ],
    "Nalgonda": [
        "Bhongir",
        "Mothkur",
        "Nakrekal",
        "Narketpalle",
        "Nalgonda",
        "Saligouraram",
        "Thipparthi"
    ],
    "Narayanpet": [
        "Dhanwada",
        "Kosgi",
        "Maddur",
        "Maganoor",
        "Makthal",
        "Marikal",
        "Narayanpet",
        "Narva",
        "Utkoor"
    ],
    "Nirmal": [
        "Dastuarabad",
        "Dilawarpur",
        "Kaddampeddur",
        "Khanapur",
        "Laxmanchanda",
        "Mamada",
        "Narsapur_G",
        "Nirmal Rural",
        "Nirmal Urban",
        "Pembi",
        "Sarangapur",
        "Soan"
    ],
    "Nizamabad": [
        "Aloor",
        "Armur",
        "Balkonda",
        "Bheemgal",
        "Donkeshwar",
        "Jakranpalle",
        "Kammarpalle",
        "Mendora",
        "Mortad",
        "Mupkal",
        "Nandipet",
        "Vailpur",
        "Yergatla"
    ],
    "Peddapalli": [
        "Kamanpur",
        "Manthani",
        "Mutharam",
        "Ramagiri"
    ],
    "Rajanna Sircilla": [
        "Ellanthakunta",
        "Gambhiraopeta",
        "Mustabad",
        "Sircilla",
        "Thangallapalle",
        "Veernapalle",
        "Yellareddypeta"
    ],
    "Sangareddy": [
        "Ameenpur",
        "Andole",
        "Gummadidala",
        "Hathnoora",
        "Jinnaram",
        "Kandi",
        "Kondapur",
        "Munipally",
        "Patancheru",
        "Pulkal",
        "Ramchandrapuram",
        "Sadasivpet",
        "Sangareddy",
        "Vatpally"
    ],
    "Siddipet": [
        "Cherial",
        "Chinnakodur",
        "Doulthabad",
        "Dubbak",
        "Komuravelli",
        "Mirdoddi",
        "Nangnoor",
        "Narayanaraopet",
        "Siddipet (Urban)",
        "Siddipet (Rural)",
        "Thoguta"
    ],
    "Suryapet": [
        "Atmakur(s)",
        "Chivvemla",
        "Jajireddygudem",
        "Maddirala",
        "Mothey",
        "Nagaram",
        "Nuthankal",
        "Penpahad",
        "Thirumalagiri",
        "Thungathurthy",
        "Suryapet"
    ],
    "Vikarabad": [
        "Bantwaram",
        "Doma",
        "Dharur",
        "Kotepally",
        "Kulkacherla",
        "Marpalle",
        "Mominpet",
        "Nawabpet",
        "Pargi",
        "Pudur",
        "Vikarabad"
    ],
    "Wanaparthy": [
        "Amarchinta",
        "Atmakur",
        "Chinnambavi",
        "Ghanpur (Khilla)",
        "Gopalpeta",
        "Kothakota",
        "Madanapur",
        "Pangal",
        "Pebbair",
        "Peddamandadi",
        "Revally",
        "Srirangapur",
        "Veepanagandla",
        "Wanaparthy"
    ],
    "Warangal": [
        "Geesugonda",
        "Khila Warangal",
        "Parvathagiri",
        "Rayaparthy",
        "Wardhannapet",
        "Warangal",
        "Sangem"
    ],
    "Yadadri Bhuvanagiri": [
        "Addaguduru",
        "Alair",
        "Atmakur (M)",
        "Bibinagar",
        "Bhongir",
        "Bommalaramaram",
        "Gundala",
        "Motakondur",
        "Mothkur",
        "Rajapet",
        "Turkapally",
        "Yadagirigutta"
    ],
    "Srikakulam": [
        "Srikakulam",
        "Tekkali"
    ],
    "Vizianagaram": [
        "Vizianagaram",
        "Bobbili"
    ],
    "Parvathipuram Manyam": [
        "Parvathipuram",
        "Salur"
    ],
    "Alluri Sitharama Raju": [
        "Paderu",
        "Araku Valley"
    ],
    "Visakhapatnam": [
        "Visakhapatnam (Urban)",
        "Visakhapatnam (Rural)"
    ],
    "Anakapalli": [
        "Anakapalle",
        "Chodavaram"
    ],
    "Kakinada": [
        "Kakinada (Urban)",
        "Kakinada (Rural)"
    ],
    "Dr. B. R. Ambedkar Konaseema": [
        "Amalapuram",
        "Mummidivaram"
    ],
    "East Godavari": [
        "Rajahmundry (Urban)",
        "Rajahmundry (Rural)"
    ],
    "West Godavari": [
        "Eluru (Urban)",
        "Eluru (Rural)"
    ],
    "Eluru": [
        "Eluru",
        "Denduluru"
    ],
    "Krishna": [
        "Machilipatnam",
        "Vijayawada"
    ],
    "NTR": [
        "Nandigama",
        "Tiruvuru"
    ],
    "Guntur": [
        "Guntur (Urban)",
        "Guntur (Rural)"
    ],
    "Palnadu": [
        "Narasaraopet",
        "Sattenapalle"
    ],
    "Bapatla": [
        "Bapatla",
        "Parchur"
    ],
    "Prakasam": [
        "Ongole (Urban)",
        "Ongole (Rural)"
    ],
    "Sri Potti Sriramulu Nellore": [
        "Nellore (Urban)",
        "Nellore (Rural)"
    ],
    "Kurnool": [
        "Kurnool (Urban)",
        "Kurnool (Rural)"
    ],
    "Nandyal": [
        "Nandyal",
        "Adoni"
    ],
    "Anantapuramu": [
        "Anantapur (Urban)",
        "Anantapur (Rural)"
    ],
    "Sri Sathya Sai": [
        "Puttaparthi",
        "Dharmavaram"
    ],
    "YSR": [
        "Kadapa (Urban)",
        "Kadapa (Rural)"
    ],
    "Annamayya": [
        "Rajampet",
        "Kodur"
    ],
    "Tirupati": [
        "Tirupati (Urban)",
        "Tirupati (Rural)"
    ],
    "Chittoor": [
        "Chittoor (Urban)",
        "Chittoor (Rural)"
    ],
};


const villages = {
    "Adilabad Rural": [
        "Village 1",
        "Village 2"
    ],
    "Adilabad Urban": [
        "Village 3",
        "Village 4"
    ],
    "Bazarhatnoor": [
        "Village 5",
        "Village 6"
    ],
    "Bela": [
        "Village 7",
        "Village 8"
    ],
    "Boath": [
        "Village 9",
        "Village 10"
    ],
    "Bheempoor": [
        "Village 11",
        "Village 12"
    ],
    "Gudihathnur": [
        "Village 13",
        "Village 14"
    ],
    "Ichoda": [
        "Village 15",
        "Village 16"
    ],
    "Jainad": [
        "Village 17",
        "Village 18"
    ],
    "Mavala": [
        "Village 19",
        "Village 20"
    ],
    "Neradigonda": [
        "Village 21",
        "Village 22"
    ],
    "Sirikonda": [
        "Village 23",
        "Village 24"
    ],
    "Talamadagu": [
        "Village 25",
        "Village 26"
    ],
    "Tamsi": [
        "Village 27",
        "Village 28"
    ],
    "Utnoor": [
        "Village 29",
        "Village 30"
    ],
     "Addakal": [
            "Village A1",
            "Village A2"
        ],
        "Balanagar": [
            "Village B1",
            "Village B2"
        ],
        "Bhoothpur": [
            "Village C1",
            "Village C2"
        ],
        "Chinna_Chintha_Kunta": [
            "Village D1",
            "Village D2"
        ],
        "Devarkadara": [
            "Village E1",
            "Village E2"
        ],
        "Gandeed": [
            "Village F1",
            "Village F2"
        ],
        "Hanwada": [
            "Village G1",
            "Village G2"
        ],
        "Jadcherla": [
            "Village H1",
            "Village H2"
        ],
        "Koilkonda": [
            "Village I1",
            "Village I2"
        ],
        "Mahabubnagar_Rural": [
            "Village J1",
            "Village J2"
        ],
        "Mahabubnagar_Urban": [
            "Village K1",
            "Village K2"
        ],
        "Midjil": [
            "Village L1",
            "Village L2"
        ],
        "Mohammadabad": [
            "Village M1",
            "Village M2"
        ],
        "Musapet": [
            "Village N1",
            "Village N2"
        ],
        "Nawabpet": [
            "Village O1",
            "Village O2"
        ],
        "Rajapur": [
            "Village P1",
            "Village P2"
        ],
        "Srikakulam Rural": [
            "Village A1",
            "Village A2"
        ],
        "Srikakulam Urban": [
            "Village B1",
            "Village B2"
        ],
        "Vizianagaram Rural": [
            "Village C1",
            "Village C2"
        ],
        "Vizianagaram Urban": [
            "Village D1",
            "Village D2"
        ],
        "Parvathipuram Manyam Rural": [
            "Village E1",
            "Village E2"
        ],
        "Parvathipuram Manyam Urban": [
            "Village F1",
            "Village F2"
        ],
        "Alluri Sitharama Raju Rural": [
            "Village G1",
            "Village G2"
        ],
        "Alluri Sitharama Raju Urban": [
            "Village H1",
            "Village H2"
        ],
        "Visakhapatnam Rural": [
            "Village I1",
            "Village I2"
        ],
        "Visakhapatnam (Urban)": [
            "Village J1",
            "Village J2"
        ],
        "Anakapalli Rural": [
            "Village K1",
            "Village K2"
        ],
        "Anakapalli Urban": [
            "Village L1",
            "Village L2"
        ],
        "Kakinada Rural": [
            "Village M1",
            "Village M2"
        ],
        "Kakinada Urban": [
            "Village N1",
            "Village N2"
        ],
        "Dr. B. R. Ambedkar Konaseema Rural": [
            "Village O1",
            "Village O2"
        ],
        "Dr. B. R. Ambedkar Konaseema Urban": [
            "Village P1",
            "Village P2"
        ],
};


stateSelect.addEventListener("change", function() {
    const selectedState = stateSelect.value;
    populateOptions(districtSelect, districts[selectedState]);
});

districtSelect.addEventListener("change", function() {
    const selectedDistrict = districtSelect.value;
    populateOptions(mandalSelect, mandals[selectedDistrict]);
});

mandalSelect.addEventListener("change", function() {
    const selectedMandal = mandalSelect.value;
    populateOptions(villageSelect, villages[selectedMandal]);
});

function populateOptions(selectElement, optionsArray) {
    selectElement.innerHTML = '<option value="" selected disabled>Select</option>';
    if (optionsArray && optionsArray.length > 0) {
        optionsArray.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.textContent = option;
            optionElement.value = option;
            selectElement.appendChild(optionElement);
        });
    } else {
        const optionElement = document.createElement("option");
        optionElement.textContent = "No data available";
        optionElement.value = "";
        selectElement.appendChild(optionElement);
    }
}