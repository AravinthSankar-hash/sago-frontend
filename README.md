# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

<!-- About store for catalog tabs -->

GENERAL

    SHOULDSHOWBACKBUTTON -> true
    \_\_-- CTA -> if any row is clicked || if Add staff is clicked -> CHANGE shouldShowBackButton to true

    SHOULDSHOWBACKBUTTON -> false
    \_\_-- CTA back button

    ACTIVECATALOGTABCOMPONENT -> initial <Customer>
    \_\_ -> will be changed whenever user clicks on any tab, this will be helpful in case like, let's say user clicks on form or table row from any tab, now again when clicking on back btn should take him to the component in this store variable

STAFF

    SHOWSTAFFNEWFORM -> initial false
    \_\_ -> whenever user clicks on add staff, this should be updated to true, which will display the FORM comp.
    \_\_ -> whenever back button is clicked this will set to false, so that dashboard will be visible

    SHOWSTAFFDETAILSSECTION -> initial false
    \_\_ -> whenever user clicks on any row in the staff table, this should be updated to true, which will display details section.
    \_\_ -> whenever back button is clicked this will set to false, so that dashboard will be visible

VEHICLE

    SHOWVEHICLENEWFORM -> initial false
    \_\_ -> whenever user clicks on add Vehicle, this should be updated to true, which will display the FORM comp.
    \_\_ -> whenever back button is clicked this will set to false, so that dashboard will be visible

    SHOWVEHICLEDETAILSSECTION -> initial false
    \_\_ -> whenever user clicks on any row in the Vehicle table, this should be updated to true, which will display details section.
    \_\_ -> whenever back button is clicked this will set to false, so that dashboard will be visible
