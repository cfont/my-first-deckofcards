# My Experiences with the Experience SDK

1. Some of the images are broken for me on the Confluence page. If I click the image, copy the link, load it in a new browser window/tab, close the window, go back to the wiki page, then it works... not sure that is a "just me" problem
2. Suggest update to wiki page to reference EPDS to the Ellucian Path Design System so that people know what that means.
3. Suggest update as inline comment to wiki page for phrase that said, "When a web app needs retrieve data from Ethos..." so that it sounds better to me if it said, "When a web app needs *to* retrieve data..."
4. Link to the EPDS docs does not work for me because I'm not on VPN but if I connect then it works fine.
5. Suggested that documentation be updated with more info that should be shared when contacting Ellucian Support Center and requesting an ssh public key get added to git authN repo. I think this could be better so that "internal" people don't just create a new support ticket and attach a public key but also enter the right description for ActionLine to route the request the best way possible. This was not a problem for me since I've had access to the git repo for many, many years.
6. Wanted confirmation that Node 10.x is the only version of node that is supported. The statement is rather cold and doesn't otherwise address that version 10 is one or two LTS versions of node behind the current LTS version. So, just wanted to know if I could use more recent version or if 10 is all that is supported.
   1. In order to resolve this for myself, since I already had a newer version of node on my system, I installed nvm.
   2. Then, using nvm, I installed the most current version of node 10.
7. Attempt to create-experience-extension failed because I was not on VPN and did not know I needed to be on VPN. After connecting to VPN, I was able to successfully generate my extension code directory.
8. in the delivered extension.json5 file, the cards.source values range from including the .jsx extension to not including that extension. Is there a reason for that? suggestions? recommendations?
9. React seems overwhelming at the moment. Still need to learn that and become comfortable with it.
10. Definitely have to learn and become familiar with the Ellucian Path Design System.
11. After copying/pasting my graphql query into extension.json5 and attempting to run the mock dashboard, I get many errors about not having an extension.json file. Once I removed the query filters then I don't get the errors any longer. 
12. Dev team suggested using the Path Table design but I still haven't learned EPDS yet. After adding import statements suggested by Bret, VSCode is giving me warnings because I'm importing hedtech/react-design-system/core many, many times.
13. What do I need to do to update my extension sdk npm libraries? update package.json and use create switch then you'll get new sdk
14. if I want to publish my extension to “real life” can i feel confident that I will also be able to delete/remove it if I don’t want to be embarrassed later? I know/remember there is a way to manage/upgrade versions but I cannot remember about removing/deleting. 
    1.  yes
15. how would I do this? 
    1.  you can delete via the Extension Management UI. This will remove the card(s) from the Card Management table in Dashboard, as well as any users’ dashboards who had saved the card.  Also, if you “publish” an extension via the npx experience-extension upload command, you still must enable it in Setup for it to appear in Dashboard’s Card Management. Then, you must enable it and assign roles before user’s can add it. So running the publish command doesn’t immediately make it publicly available.
    2.  You are using words here that I can’t cross-reference with what I see on the screen: what is Dashboard’s Card Management? Is that the page I get when I click on my name in the upper right hand corner and click “Extensions” (the page that says “Extension Management”) ?
    3.  So, after I enable it there, then I must enable it again… somewhere else… where I can potentially assign roles…? Is that where I would ideally be able to connect the Experience Setup (DEMO) site? Or, where I would normally go into my Dashboard as someone with rights to enable, create, and manage delivered card types?
16. Should I delete all of the sample cards prior to uploading my extension? 
    1.  Yes, you should delete them, or at minimum, comment out their definitions in extensions.json5.  This way, if you want to continue to use them in your Mock dashboard, you can just remove the comments and run npm start
    2.  extension.json5 drives which cards get uploaded when you run the upload command, so commenting them out would prevent them from being uploaded.
    /src/cards/index.js is the what drives which cards appear in your Mock dashboard locally.
    So, yeah, this is a little weird. Would you ever want to keep some of those samples cards on your Mock dashboard to interact with, but not include them in the extension you upload? We could add a flag like
    "package":"false", to extension.json5 that would allow you to do that.
17. If I delete them, what else do I need to modify? index.js (inside of src/cards)
    1.  src/cards/index.js  doesn’t get bundled and upload. It’s only used for the Mock running locally. If you delete the sample cards, add your own, and try to run the Mock, you’ll get errors until you also delete the references to them from src/cards/index.js
18. How do I upgrade the SDK of a current extension project? 
    1.  question about the SDK upgrade procedure… considering that I have pre-existing code in this directory and don’t want to break that code nor do I want to create a new directory with the new SDK stuff: do I have this as an optional list of instructions:
        1.  inside of my directory created by the initial create-experience-extension command
        2.  npm install git+https://git.ellucian.com/scm/eee/experience-extension.git#v0.3.9 --save-dev
        3.  and then edit the package.json peerDependencies to match the same version. There doesn’t appear to be a way to update the peer with the npm command
        4.  then run npm install again just to finish up
    2.  versus, or, this optional list of instructions:
        1.  inside of my directory created by the initial create-experience-extension command
        2.  just edit package.json and change the versions to 0.3.9 for both and run npm install :slightly_smiling_face:
        3.  and, presume that “both” in step 2 means both instances of the property called “experience-extension” in package.json
19. need to inventory resources needed for graphql query and need to raise error when it doesn't work to know this is the problem.
    1.  students
    2.  student-charges
    3.  academic-periods
    4.  accounting-codes
20. Look at .env file for updated field to upload extension to 1.10 versioned DEMO environment.
21. From A-Team meeting:
  1. Path 3.11.1 and be behind most current version of Path
  2. what does UMD mean? 
  3. Customer DPG - Life University and Catawba College
  4. June 8, the EPDS should be available to public
  5. update to sdk: graphql - range of version in config and they will choose the most appropriate version. pluralized and singularized. 
  6. Path Design documentation getting started says what they need to learn. https://design-system.10133.elluciancloud.com/#/getting-started/getting-started



## Extension Ideas 

1. BDM View My Docs cards
2. Ethos AppConfig Status cards
3. Student - Current Holds
4. Student - Current charges / financial info

## Helpful VSCode Extensions

### Robert Levy

* things that help with experience extensions that you might not otherwise be using:
  * mikestead.dotenv - yes
  * mrmlnc.vscode-json5 - yes
* others I like in general that could be relevant to experience extensions:
  * coenraads.bracket-pair-colorizer - no - yes
  * yassh.copy-with-line-numbers - no - yes
  * dbaeumer.vscode-eslint - yes
  * wooodhead.disable-eslint-rule - no - yes
  * ghmcadams.lintlens - no - yes
  * ms-vsliveshare.vsliveshare - no
  * yzhang.markdown-all-in-one - yes
  * vscodeintellicode - no - yes

### Bret Hansen

* msjsdiag.debugger-for-chrome - no - yes
* dbaeumer.vscode-eslint
* znck.grammarly - no - found github but not inside vscode
* vscodevim.vim - no

