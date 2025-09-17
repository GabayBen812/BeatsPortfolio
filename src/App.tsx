import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import HomeOne from "./components/homes/home";
import HomeTwo from "./components/homes/home-2";
import { useEffect, useState } from "react";
import HomeThree from "./components/homes/home-3";
import Blog from "./components/blog";
import BlogList from "./components/blog-list";
import BlogDetails from "./components/blog-details";
import Service from "./components/service";
import ServiceDetails from "./components/service-details";
import About from "./components/about";
import Pricing from "./components/pricing";
import Faq from "./components/faq";
import Contact from "./components/contact";
import NotFound from "./error";
import Login from "./components/login";
import Dashboard from "./pages/Dashboard";
import UserHome from "./pages/UserHome";
import Catalog from "./pages/Catalog";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import AuthGuard from "./components/auth/AuthGuard";

const router = createBrowserRouter([
	{ path: "/", element: <HomeOne /> }, 
	{ path: "/home-2", element: <HomeTwo /> },
	{ path: "/home-3", element: <HomeThree /> },
	{ path: "/blog", element: <Blog /> },
	{ path: "/blog-list", element: <BlogList /> },
	{ path: "/blog-details", element: <BlogDetails /> },
	{ path: "/service", element: <Service /> },
	{ path: "/service-details", element: <ServiceDetails /> },
	{ path: "/about", element: <About /> },
	{ path: "/pricing", element: <Pricing /> },
	{ path: "/faq", element: <Faq /> },
	{ path: "/contact", element: <Contact /> },
	{ 
		path: "/login", 
		element: (
			<AuthGuard requireAuth={false}>
				<Login />
			</AuthGuard>
		) 
	},
	{ 
		path: "/user-home", 
		element: (
			<AuthGuard requireAuth={true}>
				<UserHome />
			</AuthGuard>
		) 
	},
	{ 
		path: "/catalog", 
		element: (
			<AuthGuard requireAuth={true}>
				<Catalog />
			</AuthGuard>
		) 
	},
	{ 
		path: "/upload", 
		element: (
			<AuthGuard requireAuth={true}>
				<Upload />
			</AuthGuard>
		) 
	},
	{ 
		path: "/profile", 
		element: (
			<AuthGuard requireAuth={true}>
				<Profile />
			</AuthGuard>
		) 
	},
	{ 
		path: "/public-profile/:userId", 
		element: <PublicProfile />
	},
	{ 
		path: "/dashboard", 
		element: (
			<AuthGuard requireAuth={true}>
				<Dashboard />
			</AuthGuard>
		) 
	},

	//  not found page
	{ path: "*", element: <NotFound /> },
]);

function App() {
 
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("navbar-sticky-init", sticky);
  }, [sticky]);



	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
