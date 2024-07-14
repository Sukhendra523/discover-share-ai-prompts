import "@styles/globals.css";
import NavBar from "@components/NavBar";
import Provider from "@components/Provider";

export const metadata = {
  title: {
    template: "%s | AI Promptodia",
    default: "Promptodia",
  },
  description: "Discover & Share AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <NavBar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
