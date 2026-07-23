import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeUpWhenVisible } from "../components/animations/TextReveal.jsx";

const ease = [0.25, 0.46, 0.45, 0.94];

const ARTICLES = [
  {
    id: "cartier-santos-dumont-monture-absolue",
    category: "Maisons",
    tag: "À la une",
    title: "Cartier Santos-Dumont : pourquoi c'est la monture absolue",
    excerpt: "Dans un catalogue où chaque pièce affiche ostensiblement sa maison, la Santos-Dumont choisit la discrétion. C'est précisément ce qui la rend indispensable — et intemporelle.",
    img: "/images/hero-cartier.png",
    author: "Équipe Maison Regard",
    date: "18 juin 2026",
    readTime: "6 min",
    featured: true,
    content: [
      {
        type: "intro",
        text: "Il y a des montures qui crient leur prix. Et il y en a une qui murmure quelque chose de plus rare : le goût. La Cartier Santos-Dumont n'a pas besoin de s'imposer. Elle s'installe, avec cette assurance tranquille des objets qui ont déjà prouvé leur valeur.",
      },
      {
        type: "h2",
        text: "Un hommage à l'aviateur",
      },
      {
        type: "p",
        text: "La Santos n'est pas née sur un bureau de design — elle est née dans le ciel. Alberto Santos-Dumont, aviateur brésilien installé à Paris au tournant du XXe siècle, se plaignait de ne pouvoir lire sa montre de poche pendant ses vols. Louis Cartier, son ami, lui créa la première montre-bracelet fonctionnelle. La Santos-Dumont, version lunette, perpétue cet héritage : une géométrie carrée, des vis apparentes, une construction qui montre ce qu'elle est.",
      },
      {
        type: "h2",
        text: "Pourquoi elle est sous-estimée",
      },
      {
        type: "p",
        text: "La panthère Cartier fait la couverture. La Santos, elle, fait les couvertures de ceux qui savent. Elle est portée par des architectes, des directeurs artistiques, des gens qui lisent les crédits des films. Elle ne cherche pas à être remarquée — mais elle l'est toujours, par les bonnes personnes.",
      },
      {
        type: "p",
        text: "Sa force vient de sa cohérence. La monture reprend les codes de la Santos-Dumont originale : le cadran carré, les vis à cabochon saphir, l'équilibre entre métal doré et acétate. Elle ne suit pas les tendances — elle les précède de dix ans, et les survive de vingt.",
      },
      {
        type: "h2",
        text: "Pour qui ?",
      },
      {
        type: "p",
        text: "Pour les visages ovales et oblongs principalement — la forme carrée équilibre la longueur. Pour les peaux claires comme pour les carnations foncées : la version dorée est universelle. Et pour ceux qui n'ont pas besoin qu'on reconnaisse leur monture pour se sentir à leur place.",
      },
      {
        type: "quote",
        text: "La vraie distinction, c'est de ne pas avoir besoin d'être distingué.",
      },
    ],
  },
  {
    id: "choisir-lunettes-forme-visage",
    category: "Visagisme",
    tag: "Guide",
    title: "Comment choisir ses lunettes selon la forme de son visage",
    excerpt: "Ovale, rond, carré, en cœur — la forme du visage n'est pas une contrainte, c'est un point de départ. Voici les règles, et surtout comment les dépasser.",
    img: "/images/lifestyle-femme-1.png",
    author: "Équipe Maison Regard",
    date: "12 juin 2026",
    readTime: "7 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "Le visagisme lunettier est à la fois une science et un art. La règle de base — contrebalancer sa forme de visage avec une monture opposée — est un bon point de départ. Mais la règle ne fait pas le style.",
      },
      {
        type: "h2",
        text: "Visage ovale : la liberté avec discernement",
      },
      {
        type: "p",
        text: "L'ovale est réputé « universel ». C'est vrai — et c'est aussi son piège. Face à autant de liberté, on peut se perdre. La règle : évitez les montures trop larges qui déséquilibrent le bas du visage, et les formes trop petites qui rétrécissent le regard. Une monture légèrement plus large que la pommette est idéale.",
      },
      {
        type: "h2",
        text: "Visage rond : structurer sans alourdir",
      },
      {
        type: "p",
        text: "Les formes rectangulaires et carrées allongent le visage. Fuyez l'arrondi parfait — il accentue la rondeur. Les branches légèrement remontées et les montures à double pont créent de la verticalité. Le Dita Grand APX est un exemple parfait : géométrique, mais pas agressif.",
      },
      {
        type: "h2",
        text: "Visage carré : adoucir les angles",
      },
      {
        type: "p",
        text: "Cherchez l'arrondi — pas le cercle parfait, mais une forme qui casse la rigidité des angles mandibulaires. Les ovales légèrement allongés, les rimless, les montures montées haut sur le nez sont vos alliés. Évitez les formes trop anguleuses qui dupliquent votre ligne de mâchoire.",
      },
      {
        type: "h2",
        text: "Visage en cœur : équilibrer le bas",
      },
      {
        type: "p",
        text: "Front large, menton étroit — vous avez besoin d'une monture qui apporte du volume dans la partie basse du regard. Les formes cat-eye légères, les montures sans cercle inférieur (semi-rimless), et les teintes plus claires dans le bas de la monture créent l'équilibre.",
      },
      {
        type: "quote",
        text: "Le visagisme donne les règles. Le style donne la permission de les briser.",
      },
      {
        type: "h2",
        text: "Ce que les règles ne disent pas",
      },
      {
        type: "p",
        text: "La forme du visage n'est qu'un paramètre parmi d'autres : le teint, la couleur des yeux, la longueur du nez, la largeur des épaules — tout cela influence le résultat final. C'est pourquoi un essayage en boutique, avec un opticien qui observe l'ensemble de votre silhouette, reste irremplaçable.",
      },
    ],
  },
  {
    id: "lire-ordonnance-optique",
    category: "Guide",
    tag: "Pratique",
    title: "Lire son ordonnance optique en 2 minutes chrono",
    excerpt: "SPH, CYL, AXE, ADD — ces chiffres vous semblent abstraits ? Voici la traduction complète, sans jargon médical.",
    img: "/images/lifestyle-homme-1.png",
    author: "Équipe Maison Regard",
    date: "5 juin 2026",
    readTime: "4 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "Votre ordonnance optique ressemble à une formule chimique. Elle ne l'est pas. Une fois le code déchiffré, elle vous dira exactement ce que vos yeux demandent — et ce que votre opticien va vous préparer.",
      },
      {
        type: "h2",
        text: "SPH — La sphère",
      },
      {
        type: "p",
        text: "C'est le chiffre principal. Il indique si vous êtes myope (signe négatif, ex : -2,50) ou hypermétrope (signe positif, ex : +1,75). L'unité est la dioptrie. Plus le chiffre est éloigné de 0, plus la correction est importante.",
      },
      {
        type: "h2",
        text: "CYL et AXE — L'astigmatisme",
      },
      {
        type: "p",
        text: "Si votre ordonnance mentionne un CYL (cylindre), vous avez de l'astigmatisme — votre œil n'est pas parfaitement sphérique, mais légèrement ovale. L'AXE (en degrés, de 0 à 180) indique la direction de cette irrégularité. Ces deux valeurs vont toujours ensemble.",
      },
      {
        type: "h2",
        text: "ADD — L'addition (presbytie)",
      },
      {
        type: "p",
        text: "L'ADD n'apparaît qu'après 40 ans environ. C'est la correction supplémentaire pour voir de près — c'est elle qui détermine votre besoin en verres progressifs ou en lunettes de lecture. Elle est toujours positive, généralement entre +0,75 et +3,50.",
      },
      {
        type: "h2",
        text: "OD et OG — Œil droit et œil gauche",
      },
      {
        type: "p",
        text: "OD (Oculus Dexter) = œil droit. OG (Oculus Sinister) = œil gauche. Vos deux yeux peuvent avoir des corrections très différentes — c'est normal et fréquent. L'écart entre les deux s'appelle l'anisométropie.",
      },
      {
        type: "quote",
        text: "Une ordonnance valide 3 ans pour les adultes, 1 an pour les enfants — pensez à la renouveler.",
      },
    ],
  },
  {
    id: "fred-heritage-nautique",
    category: "Maisons",
    tag: "Histoire",
    title: "Fred : l'héritage nautique qui a tout changé",
    excerpt: "Comment une maison de joaillerie fondée à Paris a-t-elle révolutionné la monture technique ? L'histoire de Fred Samuel et de l'incroyable Force 10.",
    img: "/images/brand-fred-2.png",
    author: "Équipe Maison Regard",
    date: "28 mai 2026",
    readTime: "6 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "Il y a des maisons qui font des lunettes. Et il y a Fred, qui a inventé un objet. La Force 10 n'est pas une monture — c'est une philosophie : celle de la résistance, de l'élégance active, de la beauté qui n'a pas peur du vent.",
      },
      {
        type: "h2",
        text: "Fred Samuel, un joaillier sur les mers",
      },
      {
        type: "p",
        text: "Né en 1908 à Alexandrie, Fred Samuel ouvre sa première boutique place Vendôme en 1936. Mais ce qui fait Fred, c'est la mer. Passionné de voile, il s'inspire des cordages et des matériaux marins dans ses créations. Son bijou emblématique — le bracelet Force 10, dont le câble d'acier reprend celui des voiliers — est devenu une référence absolue de la joaillerie sport-chic.",
      },
      {
        type: "h2",
        text: "La Force 10 en lunetterie",
      },
      {
        type: "p",
        text: "Quand Fred décline sa Force 10 en monture optique, il ne fait pas une « lunette de joaillier ». Il crée un objet fonctionnel avec une âme. Le câble tressé qui structure la branche, les vis dorées, le métal résistant à la corrosion — tout parle de la mer, mais sans jamais tomber dans le cliché marin.",
      },
      {
        type: "p",
        text: "Le résultat est rare : une monture technique qui convient aussi bien au costume trois pièces qu'à la veste de quart. Elle est portée par des chirurgiens, des architectes navals, des femmes d'affaires qui savent que le vrai luxe n'a pas besoin d'être explicite.",
      },
      {
        type: "quote",
        text: "Fred a compris avant tout le monde que le luxe le plus durable est celui qui résiste à l'épreuve du temps et des éléments.",
      },
    ],
  },
  {
    id: "progressifs-guide-honnete",
    category: "Guide",
    tag: "Pratique",
    title: "Verres progressifs : le guide honnête que personne ne vous donne",
    excerpt: "Adaptation, corridor de progression, marques, prix — tout ce que votre opticien aurait dû vous expliquer dès le premier rendez-vous.",
    img: "/images/lifestyle-homme-2.png",
    author: "Équipe Maison Regard",
    date: "20 mai 2026",
    readTime: "8 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "Les progressifs sont le sujet le plus mal expliqué de l'optique. Trop de clients repartent avec une paire qu'ils n'arrivent pas à porter, sans comprendre pourquoi. Voici ce que tout opticien honnête devrait vous dire avant que vous signiez.",
      },
      {
        type: "h2",
        text: "Ce que sont vraiment les progressifs",
      },
      {
        type: "p",
        text: "Un verre progressif contient plusieurs corrections en un : vision de loin en haut, vision intermédiaire au milieu, vision de près en bas. La transition est progressive — d'où le nom. Il n'y a pas de ligne visible (contrairement aux anciens bifocaux). Mais cette progression crée des zones de flou sur les côtés du verre — c'est inévitable, et c'est ce qu'on appelle les aberrations latérales.",
      },
      {
        type: "h2",
        text: "Le corridor de progression : tout est là",
      },
      {
        type: "p",
        text: "La qualité d'un progressif se mesure principalement à la largeur et à la fluidité de son corridor — la zone centrale où la vision passe de loin à près. Un verre entrée de gamme a un corridor étroit (vision de près réduite à une zone minuscule). Un verre haut de gamme (Essilor Varilux X, Zeiss Precision, Rodenstock Multigressiv) offre un corridor large, naturel, avec très peu d'aberrations sur les côtés.",
      },
      {
        type: "h2",
        text: "L'adaptation : ce qu'on ne vous dit pas",
      },
      {
        type: "p",
        text: "Tout le monde dit que les progressifs demandent « une période d'adaptation de 2 à 3 semaines ». C'est vrai pour les bons verres. Pour un verre de mauvaise qualité ou mal centré : vous ne vous y ferez jamais. Si après 3 semaines vous avez encore des nausées ou des difficultés, retournez voir votre opticien — il ne s'agit pas d'adaptation, il s'agit d'un problème de verre ou de centrage.",
      },
      {
        type: "h2",
        text: "Mes recommandations",
      },
      {
        type: "p",
        text: "Ne jamais économiser sur les verres pour mettre le budget dans la monture. La monture se voit, les verres se vivent. Un bon progressif sur une monture standard vaut mieux qu'un mauvais progressif sur une monture à 800€. Et faites toujours mesurer votre écart pupillaire et vos hauteurs de montage avec précision — c'est 80% du confort final.",
      },
      {
        type: "quote",
        text: "Un verre progressif, c'est de la géométrie personnalisée. Chaque paire est unique — aucun compromis sur la précision.",
      },
    ],
  },
  {
    id: "materiaux-lunetterie-acétate-titane-or",
    category: "Guide",
    tag: "Expert",
    title: "Acétate, titane, or : quel matériau pour vos lunettes ?",
    excerpt: "Le choix du matériau n'est pas que esthétique — c'est une question de légèreté, de durabilité et de confort. Le comparatif complet.",
    img: "/images/lifestyle-homme-3.png",
    author: "Équipe Maison Regard",
    date: "12 mai 2026",
    readTime: "5 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "On parle beaucoup de la forme et de la couleur d'une monture. Rarement du matériau. C'est pourtant lui qui déterminera votre confort au quotidien, la longévité de la pièce et son comportement sur votre visage.",
      },
      {
        type: "h2",
        text: "L'acétate : chaleur et couleur",
      },
      {
        type: "p",
        text: "L'acétate de cellulose est le matériau roi de la lunetterie contemporaine. Dérivé de fibres de coton et de bois, il offre une palette de couleurs et de textures infinies — marbrures, transparences, bicolores. Il est léger, hypoallergénique, et se réajuste facilement à la chaleur. Son défaut : il peut se déformer en cas de chaleur excessive (tableau de bord en plein soleil) et est moins résistant aux chocs que le métal.",
      },
      {
        type: "h2",
        text: "Le titane : légèreté absolue",
      },
      {
        type: "p",
        text: "Le titane est le choix des corrections importantes et des porteurs sensibles au poids. Trois fois plus léger que l'acier, hypoallergénique, anti-corrosion — il est idéal pour un usage intensif. Les grandes maisons (Dita, Cartier, Mykita) l'utilisent pour leurs montures techniques haut de gamme. Son seul défaut : les couleurs sont limitées (doré, argenté, gun-metal), et il est plus difficile à ajuster.",
      },
      {
        type: "h2",
        text: "L'or : éternité et statut",
      },
      {
        type: "p",
        text: "L'or 18 carats en lunetterie, c'est le summum. Cartier en fait sa signature. L'or ne s'oxyde pas, ne provoque aucune allergie, et patine magnifiquement avec le temps. C'est aussi un investissement : une monture or de qualité prend de la valeur. Son poids est son seul inconvénient pour les corrections élevées.",
      },
      {
        type: "h2",
        text: "Les combinés : le meilleur des deux",
      },
      {
        type: "p",
        text: "La plupart des montures haut de gamme combinent acétate et métal — front en acétate pour la couleur et le caractère, branches en titane pour la légèreté et la résistance. C'est le compromis idéal pour quiconque veut à la fois style et confort.",
      },
    ],
  },
  {
    id: "miumiu-generation-lunetterie-statement",
    category: "Tendances",
    tag: "Décryptage",
    title: "Miu Miu et l'ère de la lunette Statement",
    excerpt: "En trois saisons, la maison sœur de Prada est devenue la référence absolue de la lunetterie audacieuse. Comment — et pourquoi ça marche.",
    img: "/images/lifestyle-femme-2.png",
    author: "Équipe Maison Regard",
    date: "5 mai 2026",
    readTime: "5 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "Il y a les lunettes qu'on met pour voir. Et il y a les lunettes Miu Miu — qu'on met pour être vu. La distinction est essentielle pour comprendre pourquoi la maison a conquis en quelques saisons une génération entière.",
      },
      {
        type: "h2",
        text: "Le tournant Miu Miu",
      },
      {
        type: "p",
        text: "Miuccia Prada a toujours eu ce talent : transformer l'improbable en désirable. Ce qu'elle a fait avec Miu Miu en lunetterie, c'est exactement ça. Formes papillon exagérées, montures oversized qui débordent du visage, écailles en acétate épais, teintes improbables (jaune soufre, corail, vert forêt) — tout cela aurait pu être grotesque. C'est devenu iconique.",
      },
      {
        type: "h2",
        text: "Pourquoi ça fonctionne",
      },
      {
        type: "p",
        text: "La lunette Statement fonctionne parce qu'elle est assumée. Elle ne prétend pas être discrète — elle est là, revendiquée, portée avec une conviction qui désarme. Ce n'est pas de la provocation, c'est de l'affirmation. Et dans une époque où l'identité visuelle individuelle est devenue une langue à part entière, c'est précisément ce que la génération Z cherche.",
      },
      {
        type: "h2",
        text: "Comment la porter sans se tromper",
      },
      {
        type: "p",
        text: "La règle d'or de la monture Statement : elle doit être l'unique pièce forte de la tenue. Si vos lunettes sont extravagantes, le reste doit être épuré. Un pull crème, un jean brut, des sneakers blanches — et des Miu Miu papillon. Le contraste est la clé. Surchargez et vous perdez tout.",
      },
      {
        type: "quote",
        text: "Une monture Statement ne s'excuse pas. Elle s'affirme.",
      },
    ],
  },
  {
    id: "proteger-yeux-uv-solaires",
    category: "Expertise",
    tag: "Santé",
    title: "Lunettes solaires : ce que les marques ne vous disent pas sur l'UV",
    excerpt: "Une paire à 20€ peut filtrer autant qu'une à 500€ — ou beaucoup moins. Voici comment lire une protection UV et pourquoi le verre compte autant que la monture.",
    img: "/images/lifestyle-femme-3.png",
    author: "Équipe Maison Regard",
    date: "28 avr. 2026",
    readTime: "5 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "Les UV ne font pas mal dans l'immédiat. C'est leur piège. La cataracte, la DMLA, les kératites — ces pathologies s'installent sur des années d'exposition cumulée. Bien choisir ses solaires n'est pas qu'une affaire de style.",
      },
      {
        type: "h2",
        text: "UV400 : le minimum absolu",
      },
      {
        type: "p",
        text: "Le marquage UV400 garantit que le verre filtre 100% des rayons ultraviolets jusqu'à 400 nanomètres — c'est-à-dire la totalité du spectre UVA et UVB. En Europe, toute lunette solaire vendue légalement doit respecter la norme CE. C'est le minimum. Ce n'est pas suffisant pour évaluer la qualité d'un verre.",
      },
      {
        type: "h2",
        text: "Les catégories de teinte : 0 à 4",
      },
      {
        type: "p",
        text: "La catégorie indique le taux de transmission lumineuse : catégorie 0 (pas de teinte, usage intérieur), catégorie 2 (luminosité normale, printemps automne), catégorie 3 (forte luminosité, soleil franc, mer), catégorie 4 (haute montagne, glacier — interdit à la conduite). La plupart des solaires de plage sont en catégorie 3.",
      },
      {
        type: "h2",
        text: "Ce que la marque apporte vraiment",
      },
      {
        type: "p",
        text: "Une monture de luxe n'offre pas nécessairement une meilleure protection UV qu'une monture basique. Ce qu'elle offre : des verres de précision optique (moins de distorsion, meilleure transmission des couleurs), une qualité de matériaux (verre minéral ou polycarbonate haut de gamme), et une durabilité des traitements (anti-rayure, anti-reflet). Et une monture qui embrasse bien le visage — la protection UV vaut peu si la lumière entre par les côtés.",
      },
      {
        type: "quote",
        text: "Vos yeux n'ont pas de mécanisme de réparation UV. Chaque paire de solaires sans protection est une dette que vous payez plus tard.",
      },
    ],
  },
  {
    id: "john-dalia-artisan-independant",
    category: "Maisons",
    tag: "Portrait",
    title: "John Dalia : l'artisan qui réinvente la monture française",
    excerpt: "Ni grand groupe, ni maison centenaire. John Dalia est ce que l'artisanat lunettier français peut produire quand il refuse les compromis.",
    img: "/images/hero-dita.png",
    author: "Équipe Maison Regard",
    date: "20 avr. 2026",
    readTime: "5 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "Il y a quelque chose de presque anachronique dans la démarche de John Dalia. Dans un secteur dominé par des conglomérats, il propose le contraire : l'indépendance totale, la fabrication en petites séries, le refus des compromis de rentabilité.",
      },
      {
        type: "h2",
        text: "Une maison née du refus",
      },
      {
        type: "p",
        text: "John Dalia n'a pas créé sa maison par opportunisme. Il l'a créée parce qu'il ne trouvait pas, dans l'offre existante, ce qu'il cherchait : des montures qui aient une vraie personnalité sans se réduire à un logo. Des objets qui parlent par eux-mêmes — par leurs matières, leurs proportions, leur caractère.",
      },
      {
        type: "h2",
        text: "L'obsession des matières",
      },
      {
        type: "p",
        text: "Les montures John Dalia sont fabriquées en acétate de cellulose de haute qualité, travaillé à la main dans des ateliers italiens. Les plaques sont choisies une par une — pas de matière synthétique, pas de teinte industrielle. Chaque paire est légèrement unique, comme le sont les matières naturelles dont elle est issue.",
      },
      {
        type: "h2",
        text: "Des formes qui ont quelque chose à dire",
      },
      {
        type: "p",
        text: "Ce qui distingue John Dalia, c'est que ses formes ne sont jamais arbitraires. Chaque modèle est pensé pour une personnalité — pas pour un « type de visage ». Le Project 01 pour ceux qui veulent exister sans s'expliquer. L'Elba pour ceux qui préfèrent la géographie à la tendance. Le Kai pour ceux qui lisent les matières avant les étiquettes.",
      },
      {
        type: "quote",
        text: "Ce n'est pas une monture qui va sur votre visage. C'est une monture qui entre dans votre vie.",
      },
    ],
  },
  {
    id: "entretenir-lunettes-luxe",
    category: "Guide",
    tag: "Pratique",
    title: "Comment entretenir ses lunettes de luxe : le guide du quotidien",
    excerpt: "Une monture à 600€ peut durer 10 ans ou 18 mois. La différence tient à quelques gestes simples — et à quelques erreurs à ne jamais commettre.",
    img: "/images/lifestyle-homme-4.png",
    author: "Équipe Maison Regard",
    date: "12 avr. 2026",
    readTime: "4 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "Une monture de luxe est un objet de précision. Comme une montre ou un sac de qualité, elle demande peu — mais ce peu est essentiel. Les erreurs les plus communes sont aussi les plus évitables.",
      },
      {
        type: "h2",
        text: "Le nettoyage : jamais à sec",
      },
      {
        type: "p",
        text: "Ne jamais essuyer des verres à sec — même avec un chiffon en microfibre. Les particules de poussière microscopiques rayent la surface du verre à chaque passage. La méthode correcte : rincer les verres à l'eau tiède, appliquer une goutte de liquide vaisselle doux, rincer à nouveau, et sécher délicatement avec un chiffon propre en microfibre. En déplacement, les lingettes humides à usage unique (sans alcool) sont une bonne alternative.",
      },
      {
        type: "h2",
        text: "Poser et ranger : les règles",
      },
      {
        type: "p",
        text: "Posez toujours vos lunettes sur les deux branches — jamais sur un côté, jamais verres en bas. Rangez-les dans leur étui quand vous ne les portez pas. Évitez de les laisser sur le tableau de bord ou près d'une source de chaleur : l'acétate se déforme dès 60°C. N'utilisez jamais un étui rigide sans doublure intérieure douce.",
      },
      {
        type: "h2",
        text: "Les réglages : une fois par an minimum",
      },
      {
        type: "p",
        text: "Toute monture se désaxe avec le temps — l'usage, le sport, le fait de les enlever d'une main. Un réglage annuel en boutique (gratuit chez tous nos opticiens) suffit à maintenir un centrage correct et un confort optimal. Ne tentez pas de redresser vous-même une branche : un mauvais geste peut casser une charnière.",
      },
      {
        type: "quote",
        text: "Une lunette bien entretenue s'améliore avec le temps. L'acétate s'assouplit, la monture prend la forme de votre visage.",
      },
    ],
  },
  {
    id: "celine-epure-luxe-discret",
    category: "Maisons",
    tag: "Portrait",
    title: "Céline : quand l'épure devient le luxe suprême",
    excerpt: "Dans un monde qui crie, Céline chuchote. Et c'est précisément pour ça que la maison est devenue la référence d'une génération qui a choisi l'intelligence sur l'ostentation.",
    img: "/images/lifestyle-femme-4.png",
    author: "Équipe Maison Regard",
    date: "5 avr. 2026",
    readTime: "5 min",
    featured: false,
    content: [
      {
        type: "intro",
        text: "Céline n'a pas besoin d'un logo visible. Elle n'a pas besoin d'une campagne mondiale. Elle a quelque chose de plus fort : une cohérence absolue, saison après saison, depuis que Phoebe Philo en a redéfini l'ADN.",
      },
      {
        type: "h2",
        text: "L'héritage Philo",
      },
      {
        type: "p",
        text: "Quand Phoebe Philo prend la direction artistique de Céline en 2008, elle impose une vision radicale : le luxe sans ostentation, la femme avant la mode, la qualité des matières avant le nom de la marque. Cette philosophie a transformé Céline en référence absolue pour une clientèle qui veut être habillée, pas costumée.",
      },
      {
        type: "h2",
        text: "La lunetterie Céline : l'extension logique",
      },
      {
        type: "p",
        text: "Les lunettes Céline sont la traduction exacte de cette philosophie en accessoire. Formes épurées, acétate de qualité, couleurs sages mais jamais ternes, proportions parfaites. Rien de trop. Rien qui manque. La CL 40130U est un exemple paradigmatique : rectangulaire, légèrement surdimensionnée, elle peut se porter avec un costume comme avec un trench.",
      },
      {
        type: "h2",
        text: "Pour qui ?",
      },
      {
        type: "p",
        text: "Pour ceux qui n'ont pas besoin qu'on lise leur logo pour savoir qu'ils s'y connaissent. Pour les professionnels qui veulent une présence sans en faire trop. Pour les femmes — et les hommes — qui ont compris que le style le plus puissant est celui qui semble ne demander aucun effort.",
      },
      {
        type: "quote",
        text: "Céline ne suit pas les tendances. Elle attend que le monde la rejoigne.",
      },
    ],
  },
];

const CATEGORIES = ["Tous", "Maisons", "Guide", "Visagisme", "Tendances", "Expertise"];

function ArticleDetail({ article }) {
  return (
    <div>
      {/* Hero article */}
      <div style={{ position: "relative", height: "clamp(340px, 50vh, 540px)", overflow: "hidden" }}>
        <img
          src={article.img}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }} />
        <div style={{ position: "absolute", bottom: 48, left: 0, right: 0 }}>
          <div className="container">
            <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
              <span style={{
                fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--sand)", fontWeight: 500,
              }}>
                {article.category}
              </span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>·</span>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)" }}>
                {article.readTime} de lecture
              </span>
            </div>
            <h1 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 300, color: "white", lineHeight: 1.2, maxWidth: 720,
            }}>
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "white" }}>
        <div className="container" style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "var(--sand)", fontFamily: "var(--serif)", fontSize: "0.8rem" }}>MR</span>
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--dark)" }}>{article.author}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--gray)" }}>{article.date}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: "64px 24px 80px", maxWidth: 760 }}>
        {/* Excerpt intro */}
        <p style={{
          fontFamily: "var(--serif)", fontSize: "1.15rem", color: "var(--dark)",
          lineHeight: 1.75, marginBottom: 48, paddingBottom: 48,
          borderBottom: "1px solid var(--border)",
        }}>
          {article.excerpt}
        </p>

        {/* Body */}
        {article.content.map((block, i) => {
          if (block.type === "intro") return (
            <p key={i} style={{ fontSize: "1rem", color: "var(--dark)", lineHeight: 1.85, marginBottom: 32, fontStyle: "italic" }}>
              {block.text}
            </p>
          );
          if (block.type === "h2") return (
            <h2 key={i} style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 400, color: "var(--dark)", marginBottom: 16, marginTop: 40 }}>
              {block.text}
            </h2>
          );
          if (block.type === "p") return (
            <p key={i} style={{ fontSize: "0.95rem", color: "var(--gray)", lineHeight: 1.9, marginBottom: 20 }}>
              {block.text}
            </p>
          );
          if (block.type === "quote") return (
            <blockquote key={i} style={{
              borderLeft: "3px solid var(--sand)", paddingLeft: 24, margin: "36px 0",
            }}>
              <p style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--dark)", lineHeight: 1.65, fontStyle: "italic" }}>
                « {block.text} »
              </p>
            </blockquote>
          );
          return null;
        })}

        {/* Back */}
        <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
          <Link to="/magazine" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--sand-dark)", textDecoration: "none", fontWeight: 500,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour au Magazine
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, size = "normal" }) {
  const navigate = useNavigate();
  const isFeatured = size === "featured";
  const isLarge = size === "large";

  if (isFeatured) {
    return (
      <motion.div
        onClick={() => navigate(`/magazine/${article.id}`)}
        style={{ cursor: "pointer", gridColumn: "1 / -1" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="magazine-hero-grid" style={{ background: "#0C0C0C", overflow: "hidden" }}>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
            <img
              src={article.img}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform 0.7s ease", display: "block" }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            />
            <div style={{
              position: "absolute", top: 16, left: 16,
              background: "var(--sand)", padding: "4px 12px",
              fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, color: "var(--dark)",
            }}>
              {article.tag}
            </div>
          </div>
          <div style={{ padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sand)", marginBottom: 20 }}>
              {article.category}
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1.2, marginBottom: 20, fontWeight: 400, color: "white" }}>
              {article.title}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 36, fontSize: "0.88rem" }}>
              {article.excerpt}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>
                {article.date} · {article.readTime}
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--sand)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Lire →
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      onClick={() => navigate(`/magazine/${article.id}`)}
      style={{ cursor: "pointer", background: "white", border: "1px solid var(--border)", overflow: "hidden" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      whileHover={{ y: -4 }}
    >
      <div style={{ overflow: "hidden", aspectRatio: isLarge ? "16/9" : "4/3", position: "relative" }}>
        <img
          src={article.img}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform 0.6s ease" }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: "white", padding: "3px 10px",
          fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "var(--sand-dark)",
        }}>
          {article.tag}
        </div>
      </div>
      <div style={{ padding: "24px 26px" }}>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sand-dark)", marginBottom: 10, fontWeight: 500 }}>
          {article.category}
        </div>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", lineHeight: 1.3, marginBottom: 10, fontWeight: 400, color: "var(--dark)" }}>
          {article.title}
        </h3>
        <p style={{ color: "var(--gray)", fontSize: "0.82rem", lineHeight: 1.7, marginBottom: 16 }}>
          {article.excerpt}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.68rem", color: "var(--gray-light)" }}>{article.readTime} de lecture</span>
          <span style={{ fontSize: "0.68rem", color: "var(--sand-dark)", fontWeight: 500 }}>Lire l'article →</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Magazine() {
  const { id } = useParams();
  const [activeCat, setActiveCat] = useState("Tous");

  if (id) {
    const article = ARTICLES.find((a) => a.id === id);
    if (article) {
      return (
        <div className="pt-nav" style={{ background: "#FAFAF8" }}>
          <ArticleDetail article={article} />
          {/* Related */}
          <div style={{ background: "white", borderTop: "1px solid var(--border)", padding: "64px 0" }}>
            <div className="container">
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
                <div className="label" style={{ color: "var(--dark)" }}>Lire aussi</div>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              </div>
              <div className="grid-3">
                {ARTICLES.filter((a) => a.id !== id).slice(0, 3).map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  const filtered = activeCat === "Tous"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCat);

  const featured = ARTICLES[0];
  const rest = filtered.filter((a) => a.id !== featured.id || activeCat !== "Tous");

  return (
    <div className="pt-nav" style={{ background: "#FAFAF8" }}>

      {/* Hero */}
      <div style={{ background: "#0C0C0C", padding: "72px 0 60px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ height: 1, width: 28, background: "var(--sand)" }} />
              <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sand)" }}>
                Maison Regard · Éditorial
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, color: "white", lineHeight: 1.1, marginBottom: 18 }}>
              Le Magazine
            </h1>
            <p style={{ color: "rgba(255,255,255,0.42)", maxWidth: 520, lineHeight: 1.75, fontSize: "0.92rem" }}>
              Pas du contenu produit — du contenu expert. Visagisme, maisons de luxe, guides techniques, tendances optiques : la voix de l'opticien, pour ceux qui veulent vraiment comprendre.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ padding: "48px 24px 80px" }}>

        {/* Categories */}
        <div style={{ display: "flex", gap: 6, marginBottom: 48, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              style={{
                padding: "8px 18px", fontSize: "0.72rem", letterSpacing: "0.08em",
                textTransform: "uppercase", fontWeight: activeCat === c ? 600 : 300,
                color: activeCat === c ? "white" : "var(--gray)",
                background: activeCat === c ? "var(--dark)" : "white",
                border: `1px solid ${activeCat === c ? "var(--dark)" : "var(--border)"}`,
                cursor: "pointer", transition: "all .2s",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Article à la une */}
        {activeCat === "Tous" && (
          <div style={{ marginBottom: 40 }}>
            <ArticleCard article={featured} size="featured" />
          </div>
        )}

        {/* Grille articles */}
        <div className="grid-3" style={{ gap: 20 }}>
          {rest.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", color: "var(--gray)" }}>
              Aucun article dans cette catégorie pour l'instant.
            </p>
          </div>
        )}

        {/* Newsletter */}
        <div style={{ marginTop: 80, background: "#0C0C0C", padding: "56px 64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ height: 1, width: 24, background: "var(--sand)" }} />
              <span style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sand)" }}>
                Newsletter éditoriale
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 300, color: "white", marginBottom: 12, lineHeight: 1.25 }}>
              3 à 4 articles par mois,<br />directement chez vous.
            </h3>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", lineHeight: 1.7 }}>
              Visagisme, maisons, guides pratiques — l'essentiel sans le bruit.
              <br />Aucun spam · Désabonnement en un clic.
            </p>
          </div>
          <form style={{ display: "flex", flexDirection: "column", gap: 10 }} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="votre@email.com"
              style={{
                padding: "16px 20px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
            <button type="submit" style={{
              padding: "15px", background: "var(--sand)", color: "var(--dark)",
              border: "none", cursor: "pointer",
              fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
              transition: "opacity .2s",
            }}>
              Rejoindre la liste
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
