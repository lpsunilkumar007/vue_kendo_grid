import {
    createWebHistory,
    createRouter
} from "vue-router";
// import Issues from "./components/IssuesComponent.vue";
// import Dashboard from "./components/DashboardComponent.vue";
// import Profile from "./components/ProfileComponent.vue";
// import SignIn from "./components/SignInComponent.vue";
import SurveyForm from "./components/SurveyForm/SurveyForm.vue";
import Demo1 from "./components/SurveyForm/demo1.vue";

const routes = [{
        path: "/survey",
        name: "Survey",
        component: SurveyForm
    },
    {
        path: "/demo",
        name: "demo",
        component: Demo1
    }
];

const router = createRouter({
    history: createWebHistory("/kendo-vue/dashboard/"),
    routes
});

export default router;