# CGR - II's Traveller Character Generator!

Started out as what I thought would be a straightforward portfolio project, this has spiralled into something larger than I expected.  

Built from the ground up using Mongoose Traveller 2e rules, I aimed to capture as many of the relevant mechanics to character creation as I could, short of mailing you a physical set of dice.  

To that end, then, here is a step-by-step walkthrough of what exists so far, and towards the bottom of the document, is an incomplete list of my future goals and steps I aim to take.

## Character Creation Walkthrough.

Starting from the landing page, you'll be offered choices between two different types of stat allocation. My preferred, and thus the default, is the point buy, using the rules from the Traveller's Companion ( [Link](https://www.mongoosepublishing.com/products/traveller-companion) ). Alternatively you can do the standard "Get random stats and allocate them." I don't have code offering forced allocation as an option, yet, so you'll have to do that yourself.  
That will take you to background skills, giving you the option to select a number of skills to start at 0 based on your Education stat - after this, you'll be offered the chance to go to University.

### Universities and Mil Academies

This handles selection of a Major and Minor, as well as recording relevant skills for basic training in a military academy, and prompting you to select specialties for skills when necessary (eg, when a skill with a specialty reaches rank 1 due to either being your major, or being a minor when you graduate.)  

It also tracks qualification bonuses, although I haven't yet implemented displaying what qualification bonuses are active. It's on the list.

### Careers!

Next in the journey, you'll be redirected to selecting a career, including a specialization. Psi isn't implemented, because reasons. Reading through descriptions, select a career, and you're on to the core of the journey!  

On your first term, there will be a check for qualification, and if you succeed, you'll be redirected to the beginning steps of a career term. If you fail, you'll be offered the Draft if you haven't taken it already, and if you have, you will be redirected to the Drifter career, able to try again after a term there.  

Your first term, in any career, will give you the choice of what set of skills to run basic training on, with a drop-down menu to see what skills are available in that tree. After term 1 in any career, you won't get basic training again, and instead, you will simply be offered a choice of skill trees to roll for your skill for that term.  

Then your survival will be checked!

#### Survival, Events, and Advancement  

Each career will have the correct stat associated with its survival roll, and if you pass the survival check, you will then get a random event chosen from the career's event table. The events are exhaustively implemented, including the ones involving layered choices, redirects, and skill checks - it's all tracked, and handled behind the scenes. On the to-do list includes a display showing what, specifically, happened in a given event, but for now, it will just show results.  

After the random event, the app will roll a check against the relevant stat for advancement, and if you are promoted, it will check if your chosen career has a particular rank-up bonus at the chosen rank. If it does, it will check if the rank up bonus is a choice, and offer you that choice if so.  

## Mustering out!

At the end of a chosen career term, you will get the option to "Muster out," or leave the career. When you do, it will go through the number of terms, the rank you have earned, and so on, to determine the number of benefit rolls, the bonuses available to you, and then let you make the relevant choices as to when, and where, to use your limited number of rolls and bonuses.  

The app does track the number of cash benefits taken at a given time, as well as age, anagathics, and so on. It will check for age-related problems, offer anagathics once it becomes relevant, and keep track of stat checks to ensure you don't get arrested or have an aging crisis as a result of any anagathic use.

## To do list!  

Scrolling displays for stat and skill changes, for events and in-depth info on how they resolve, and in-depth print pages designed to give a GM all the info they need to take the papers of several players who used this app, and collate them into a coherent story based on relative ages, life paths, and so on.  

I'd also like to implement species choices, and eventually, rebuild some of the "glue" of this to support easier addition of custom classes, races, stats, and so on - much of the app is built with this in mind, but towards the end, I had to glue things together and hope, which ended up breaking the original, modular design I had in mind.