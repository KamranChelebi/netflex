import AddBlogs from "../pages/Admin/AddBlogs";
import AddBlogsCategory from "../pages/Admin/AddBlogsCategory";
import AddMovie from "../pages/Admin/AddMovie";
import AddPrice from "../pages/Admin/AddPrice";
import AddSocial from "../pages/Admin/AddSocial";
import AdminBlogs from "../pages/Admin/AdminBlogs";
import AdminContacts from "../pages/Admin/AdminContacts";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminMovies from "../pages/Admin/AdminMovies";
import AdminPricing from "../pages/Admin/AdminPricing";
import AdminProfile from "../pages/Admin/AdminProfile";
import AdminRoot from "../pages/Admin/AdminRoot";
import BlogsCategory from "../pages/Admin/BlogsCategory";
import Dashboard from "../pages/Admin/Dashboard";
import EditBlog from "../pages/Admin/EditBlog";
import EditBlogsCategory from "../pages/Admin/EditBlogsCategory";
import EditMovie from "../pages/Admin/EditMovie";
import EditPrice from "../pages/Admin/EditPrice";
import EditSocial from "../pages/Admin/EditSocial";
import Informations from "../pages/Admin/Informations";
import InformationsEdit from "../pages/Admin/InformationsEdit";
import MovieCategory from "../pages/Admin/MovieCategory";
import MovieCategoryAdd from "../pages/Admin/MovieCategoryAdd";
import MovieCategoryEdit from "../pages/Admin/MovieCategoryEdit";
import MovieLanguageAdd from "../pages/Admin/MovieLanguageAdd";
import MovieLanguageEdit from "../pages/Admin/MovieLanguageEdit";
import MovieOfTheDay from "../pages/Admin/MovieOfTheDay";
import MovieOfTheDayEdit from "../pages/Admin/MovieOfTheDayEdit";
import MoviesLanguage from "../pages/Admin/MoviesLanguage";
import MoviesQuality from "../pages/Admin/MoviesQuality";
import MoviesQualityAdd from "../pages/Admin/MoviesQualityAdd";
import MoviesQualityEdit from "../pages/Admin/MoviesQualityEdit";
import ServiceAdd from "../pages/Admin/ServiceAdd";
import ServiceEdit from "../pages/Admin/ServiceEdit";
import Services from "../pages/Admin/Services";
import Slider from "../pages/Admin/Slider";
import SliderAdd from "../pages/Admin/SliderAdd";
import SliderEdit from "../pages/Admin/SliderEdit";
import Socials from "../pages/Admin/Socials";
import Subscribers from "../pages/Admin/Subscribers";
import Users from "../pages/Admin/Users";
import Blog from "../pages/User/Blog";
import BlogDetail from "../pages/User/BlogDetail";
import Contacts from "../pages/User/Contacts";
import Favorites from "../pages/User/Favorites";
import ForgotPassword from "../pages/User/ForgotPassword";
import Home from "../pages/User/Home";
import Login from "../pages/User/Login";
import MainRoot from "../pages/User/MainRoot";
import MovieDetail from "../pages/User/MovieDetail";
import Movies from "../pages/User/Movies";
import Pricing from "../pages/User/Pricing";
import Profile from "../pages/User/Profile";
import Register from "../pages/User/Register";
import ResetPassword from "../pages/User/ResetPassword";

export const ROUTES = [
  {
    path: "/",
    element: <MainRoot />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/:id",
        element: <MovieDetail />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminRoot />,
    children: [
      {
        path: "admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "admin/profile",
        element: <AdminProfile />,
      },
      {
        path: "admin/slider",
        element: <Slider />,
      },
      {
        path: "admin/slider/:id",
        element: <SliderEdit />,
      },
      {
        path: "admin/slider-add",
        element: <SliderAdd />,
      },
      {
        path: "admin/movies",
        element: <AdminMovies />,
      },
      {
        path: "admin/movie-add",
        element: <AddMovie />,
      },
      {
        path: "admin/movies/:id",
        element: <EditMovie />,
      },
      {
        path: "admin/movies-category",
        element: <MovieCategory />,
      },
      {
        path: "admin/movies-category-add",
        element: <MovieCategoryAdd />,
      },
      {
        path: "admin/movies-category/:id",
        element: <MovieCategoryEdit />,
      },
      {
        path: "admin/movies-language",
        element: <MoviesLanguage />,
      },
      {
        path: "admin/movies-language-add",
        element: <MovieLanguageAdd />,
      },
      {
        path: "admin/movies-language/:id",
        element: <MovieLanguageEdit />,
      },
      {
        path: "admin/movies-quality",
        element: <MoviesQuality />,
      },
      {
        path: "admin/movies-quality-add",
        element: <MoviesQualityAdd />,
      },
      {
        path: "admin/movies-quality/:id",
        element: <MoviesQualityEdit />,
      },
      {
        path: "admin/movieoftheday",
        element: <MovieOfTheDay />,
      },
      {
        path: "admin/movieoftheday/:id",
        element: <MovieOfTheDayEdit />,
      },
      {
        path: "admin/subscribers",
        element: <Subscribers />,
      },
      {
        path: "admin/services",
        element: <Services />,
      },
      {
        path: "admin/service-add",
        element: <ServiceAdd />,
      },
      {
        path: "admin/services/:id",
        element: <ServiceEdit />,
      },
      {
        path: "admin/pricing",
        element: <AdminPricing />,
      },
      {
        path: "admin/price-add",
        element: <AddPrice />,
      },
      {
        path: "admin/pricing/:id",
        element: <EditPrice />,
      },
      {
        path: "admin/informations",
        element: <Informations />,
      },
      {
        path: "admin/informations/:id",
        element: <InformationsEdit />,
      },
      {
        path: "admin/contacts",
        element: <AdminContacts />,
      },
      {
        path: "admin/blogs",
        element: <AdminBlogs />,
      },
      {
        path: "admin/blogs-add",
        element: <AddBlogs />,
      },
      {
        path: "admin/blogs/:id",
        element: <EditBlog />,
      },
      {
        path: "admin/blogs-category",
        element: <BlogsCategory />,
      },
      {
        path: "admin/blogs-category-add",
        element: <AddBlogsCategory />,
      },
      {
        path: "admin/blogs-category/:id",
        element: <EditBlogsCategory />,
      },
      {
        path: "admin/users",
        element: <Users />,
      },
      {
        path: "admin/socials",
        element: <Socials />,
      },
      {
        path: "admin/socials-add",
        element: <AddSocial />,
      },
      {
        path: "admin/socials/:id",
        element: <EditSocial />,
      },
    ],
  },
];
