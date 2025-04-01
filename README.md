Video : https://youtu.be/Jh7z2w10sKo 

📱 [Interest Network to Employment]
Project Overview
[What problem does your app solve? Why does it matter to people?]
When it comes to employment, you can connect with various professionals and receive recommendations for events, articles, and research papers relevant to your desired career path. This allows you to access industry-specific information more easily and efficiently.  
Try the App
The app is deployed at <link>, and this video shows it off <link>
Initial Prompt and Cursor Response
Initial Prompt to Cursor:
Generate a React project with Firebase authentication and Firestore as the database for a job networking app. The app should allow users to track industry professionals, bookmark career events like workshops and conferences, and save relevant articles.
Build a simple app where users can enter a short message, upload an image, and view their entries. Store uploaded images in Cloudinary and store messages and image URLs in a persistent backend.
Cursor's Response:
Hello! Let's build a professional networking app. First, we will install the necessary packages and set up the project structure.
Installing Additional Packages:
We'll start by installing the required additional packages.
Setting Up Firebase:
Next, we will create the Firebase configuration file.
Tailwind CSS Initialization Issue:
Apologies for the issue with initializing Tailwind CSS. First, let's set up the basic project structure.
Creating Authentication Context:
Now, let's create the authentication-related context.
Setting Up Firestore Database Service:
Next, we will configure the Firestore database service.
Updating the Main App Component and Setting Up Routing:
Now, we will modify the main App component and configure routing.
Key Features:
User authentication (Email/Password, Google Login)


Professional network management


Event tracking and management


Article bookmarking and management


Tag-based filtering


Additional Features to Consider:
AI-powered recommendation system


Search functionality


Notification system


Social features (sharing, comments, etc.)


Data analysis and statistics
If you need any additional configurations or features, please let me know!

Was it what you expected?
No, the app's UI layout was not as I had envisioned. The font was too small, the page layout was skewed to the left, and the color scheme was too dark. While the core functionalities were well implemented, the recommendation feature was not realized. However, the login and sign-up functions were well executed.
Followup Prompts Regarding Features, and Cursor Responses
Here are ten feature-related prompts I gave to Cursor and what happened:
Prompt: “i want app that in english
 Response: Yes, I will change the language of the app to English. I will change the text of each component to English.

Prompt: I've changed the concept of the app—it's not about adding friends but about specialized networking with people related to my areas of interest. I want the app to automatically generate a list of notable figures related to my interests. I also want to keep the core functionalities intact. 
Response:Let's change the concept of the app to professional networking and add an automatic recommendation feature. First, let's edit types.ts to define interests and areas of expertise more clearly:

Prompt:If you set your interests, add a feature that automatically updates and recommends related experts.
 Response: Yes, we will add an interest-based expert recommendation feature. First, we will create a recommendation component and connect it to interests.
Prompt: “I would like to expand the types of interests, such as job-related, management, marketing, advertising, journalist, soccer, movie director, etc. And allow users to add their own categories.
 Response: Yes, we will extend the interest categories and add custom category functionality. First, we will extend the category types by modifying types.ts:
Prompt: I'm not asking you to create a button to create a category. I'm asking you to make it so that when you write about an interest, you can add it directly from the Category.
 Response: Oh, I see. I'll fix it so that you can enter categories directly in the Add Interest modal:


Prompt:And why doesn't the recommended profile appear?

 Response: Let's take a look at the Recommendations component and related code to see if there's a problem with the recommended profile not appearing. After looking at the code, I found the reason why the recommended profile isn't appearing. There's a problem with the conditional statement that renders the Recommendations component in App.tsx.
Prompt: “Can't you add Experts that actually exist? Still nothing shows up
 Response: Yes, the current system does not have a database of real-life Experts, so recommendations do not work properly. To solve this, we will add sample Expert data and implement a recommendation system based on it.


Prompt: “Please make it visible to users who don't know me. There are no profiles showing up right now.
 Response: Yes, we will fix the issue where recommended profiles do not appear. We will improve the matching logic of the Recommendations component and fix it so that it shows default recommendations even when there are no interests.


Prompt: I applied my interests but they don't show up. And when I set my interests, I have to show the experts that match them.
 Response: Yes, I will fix the issue. First, I will check if availableExperts is set properly in App.tsx, and improve the recommendation logic.
Prompt: Why don't experts associated with my interests appear in the Recommended Experts list when I add them?
 Response:Let's look into the issue. It looks like the availableExperts state in App.tsx is not being updated properly. Let's fix it so that availableExperts is updated whenever an interest is added.
Prompt : Please give Experts a lot more people's data. And also implement a feature to add favorites among Experts.
Response :Yes, we will add more expert data and implement the favorites feature. First, let's modify the sampleExperts.ts file to add more expert data.
Followup Prompts Regarding User Interface, and Cursor Responses
Here are five UI prompts I gave to Cursor:
Prompt: “Also i want the design more bigger and place at the middle of the screen and bright version

Response: Yes, let's modify the design to make it bigger and brighter and center it on the screen. First, let's modify App.tsx to adjust the overall layout:

Prompt: “the background will have to be bright color not black. and also The size of font is too small and i want to place center of the screen 
Response: Yes, we'll modify it to make the background color brighter, increase the font size, and center it on the screen. First, let's modify App.tsx to adjust the overall layout:
I initially tried to make major changes to the UI but failed, so I decided to use the previous My App to build the application and proceeded with the old files instead.



Prompt: No, the UI is the worst when deciding on a category. Make it more intuitive and simple. Also, make the back button a little better.

 Response: Yes, we will improve the UI of the Interest add modal to make it more intuitive and simple.


Prompt:Remove the add category button and keep the existing category selection function.

 Response: Yes, we will remove the Add Category button and simplify the category selection functionality.


Prompt: “And I'm going to change the order of the table of contents. In that order, Interest, Recommended Experts, group, People. And rename People to Contact. And move the + button at the top of the screen to the contact screen. I want you to add the add contact function to the contact screen.

 Response: Yes, I will make the changes you requested. First, I will modify the App.tsx file.


Promt :Please clean up the UI so that it is simple and intuitive.

Response : Yes, we will improve the UI to make it simpler and more intuitive. First, let's modify the App.css file.


Prompt :I don't like the UI, so I'd like to change the overall color scheme to blue and make the main buttons a color of the same color scheme.

Response : Yes, I will change the color scheme of the UI to a consistent blue color scheme. I will edit the App.css file.


Prompt : The add button in group and contact sticks out too much, so make it look natural and fit in with the background.

Response: Yes, we will modify the add buttons for Group and Contact to make them more natural. We will modify the App.css file.


Prompt : The + button on the group screen has not been modified and the length of the button has been reduced

Response : Yes, we will modify the + button on the Group screen and reduce the length of the button. We will modify the App.css file.


Prompt : First of all, I would like to unify the design and proportion of fonts in the app.

Response : Yes, we will unify the font design and size across the app.


Prompt : When you press each button, the font design and size ratio are all unified on the screen that appears.

Response : Yes, we will unify the font design of the modal and each component. First, let's modify the App.css file.



Summary
Final App Description:
The final app is designed to introduce users to experts in their fields of interest related to their desired career or employment path. It also allows users to save and organize relevant research papers and articles. This enables users to easily access career-related information without investing excessive time in searching, providing a more efficient way to find valuable resources.
What I liked about Cursor:
It was great that I could develop the app without any prior knowledge of HTML, CSS, or JavaScript.


I appreciated the low error rate in the code, which made development smoother.


It was useful that even detailed requirements could be applied easily using the cursor.


Challenges / Issues:
It was challenging to perfectly implement the intended UI modifications.


Executing the design as planned proved to be difficult.


Sample data should have been used for feature implementation.


There was an issue where modifying the code did not reflect changes in the design. As a result, I had to use the previously developed My App. Setting the initial prompt correctly is crucial—if done incorrectly, regenerating an entirely new structure becomes difficult.


One of the most valuable aspects of Cursor is that it allows app development without any prior knowledge of HTML, CSS, or JavaScript. This made it an incredibly useful tool for me. Through the experience of developing an app, I found myself becoming more interested in HTML, CSS, and JavaScript—subjects I had never explored before. Initially, I perceived app development as having a high barrier to entry, but using Cursor gave me the confidence and motivation to learn more about the process firsthand.
Additionally, I had previously attempted to create a coding project using ChatGPT, but I encountered numerous errors, which made the experience quite challenging. In contrast, Cursor provided a smoother development process, reinforcing my interest in app development and making me realize that learning to code may not be as difficult as I once thought.



## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
