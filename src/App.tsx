import CategoriesComponent from "./componets/Catrgories";
import FileDownloadSection from "./componets/ControlSection";
import LogTerminal from "./componets/Logger_view";
import SearchFilter from "./componets/SearchFilter";
import { Store } from "./store/app.store";
function App() {
  console.log("App rerender");
  return (
    <>
      <Store>
        <main className="flex w-full justify-evenly">
          <div>
            <img src="./logo.png" alt="logo" className="p-3" width={100} />
            <CategoriesComponent />
          </div>
          <div className="w-[65%]  ml-2 p-3 mt-2">
            <SearchFilter />

            <LogTerminal />
            <FileDownloadSection />
          </div>
        </main>
      </Store>
    </>
  );
}
export default App;
