import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import {Banner} from '../components/Banner';
import {Contact} from '../components/Contact';
import {Skills} from '../components/Skills';
import GradeManagement from '../components/GradeManagement';
import ReportGenerator from '../components/ReportGenerator';
import StudentList from '../components/StudentList';
import TeacherList from '../components/TeacherList';
import AssignCourseToClass from '../components/AssignCourseToClass';
import AddClass from '../components/AddClass';
import LoginForm from '../components/LoginPage.jsx';
import RegisterForm from '../components/RegisterPage.jsx';
import {AuthProvider} from "./AuthContext.jsx";

function Home() {
    return (
        <AuthProvider>

            <Layout>
                <Banner/>
                <Skills/>
                <Contact/>
            </Layout>
        </AuthProvider>
    );
}

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/grades" element={<GradeManagement/>}/>
                <Route path="/reports" element={<ReportGenerator/>}/>
                <Route path="/students" element={<StudentList/>}/>
                <Route path="/login" element={<AuthProvider><LoginForm /></AuthProvider>} />
                <Route path="/teachers" element={<TeacherList/>}/>
                <Route path="/courses" element={<AssignCourseToClass/>}/>
                <Route path="/class" element={<AddClass/>}/>
                <Route path="/register" element={<AuthProvider><RegisterForm /></AuthProvider>} />
            </Routes>
        </div>
    );
}

export default App;
