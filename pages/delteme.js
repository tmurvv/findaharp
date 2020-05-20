function Content() {
    
  
    return (
      <div>
        <p>
          The theme is <em>{style}</em> and state of visibility is
          <em> {visible.toString()}</em>
        </p>
        <button onClick={toggleStyle}>Change Theme</button>
        <button onClick={toggleVisible}>Change Visibility</button>
      </div>
    );
  }
  
  function App() {
    const { style, visible, toggleStyle, toggleVisible } = useContext(
        ThemeContext
      );
    const [style, setStyle] = useState("light");
    const [visible, setVisible] = useState(true);
  
    function toggleStyle() {
      setStyle(style => (style === "light" ? "dark" : "light"));
    }
    function toggleVisible() {
      setVisible(visible => !visible);
    }
  
    return (
      <ThemeContext.Provider
        value={{ style, visible, toggleStyle, toggleVisible }}
      >
        <div>
        <p>
          The theme is <em>{style}</em> and state of visibility is
          <em> {visible.toString()}</em>
        </p>
        <button onClick={toggleStyle}>Change Theme</button>
        <button onClick={toggleVisible}>Change Visibility</button>
      </div>
      </ThemeContext.Provider>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("root"));