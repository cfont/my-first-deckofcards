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

## Helpful VSCode Extensions

### Robert Levy

* things that help with experience extensions that you might not otherwise be using:
  * mikestead.dotenv
  * mrmlnc.vscode-json5
* others I like in general that could be relevant to experience extensions:
  * coenraads.bracket-pair-colorizer
  * yassh.copy-with-line-numbers
  * dbaeumer.vscode-eslint
  * wooodhead.disable-eslint-rule
  * ghmcadams.lintlens
  * ms-vsliveshare.vsliveshare
  * yzhang.markdown-all-in-one
  * vscodeintellicode

### Bret Hansen

* msjsdiag.debugger-for-chrome
* dbaeumer.vscode-eslint
* znck.grammarly
* vscodevim.vim

