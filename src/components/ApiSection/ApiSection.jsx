import { ListContent } from "../ListContent/ListContent";
import { SectionText } from "../SectionText/Sectiontext";

export const ApiSection = () => {
  let API_KEY = "b66d75e8f7862c194f0cbd7322865cc6";

  return (
    <>
      <SectionText text="Trending today" />
      <ListContent></ListContent>
    </>
  );
};
