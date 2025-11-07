import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-CJ2ETBFSC2"); 
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
