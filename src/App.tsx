import * as React from "react";
import { useState } from "react";
import "./App.css";
import Card from "./components/form-card";
import FormFamily from "./components/forms/family";
import FormMember from "./components/forms/member";
import FormRelation from "./components/forms/relation";
import SpeedDial from "./components/speeddial";
import Tree from "./components/tree";

interface ICardContent 
{
  title: string,
  content: JSX.Element
}

const App = () => {
  const [cardContent, setCardContent] = useState<ICardContent>();

  const cleanFormContent = () => setCardContent(undefined);

  const onSpeedDialClick = (id: number) => {
    switch (id)
    {
      case 1:
        setCardContent({
          title: "Member",
          content: <FormMember />
        });
        break;
      case 2:
        setCardContent({
          title: "Family",
          content: <FormFamily />
        });
        break;
      case 3:
        setCardContent({
          title: "Relation",
          content: <FormRelation />
        });
        break;
    
      default:
        cleanFormContent();
        break;
    }
  }

  return (
    <div className="bg-blue-500 w-full h-screen">
      <div className="absolute w-full h-full bg-blue-500">
        {/* Área de árbol */}
        <div className="absolute w-full h-full">
          <Tree />
        </div>

        {
          cardContent ? 
          <div className="absolute w-full h-screen overflow-y-auto px-2 top-0 left-0 mt-6 mb-0 sm:h-auto sm:px-0 sm:w-auto sm:mx-4 sm:my-4">
            <Card title={cardContent.title} onClose={cleanFormContent}>
              { cardContent.content }
            </Card>
          </div>
          :
          <div></div>
        }
      </div>
      <SpeedDial onItemClicked={onSpeedDialClick} />      
    </div>
  );
}

export default App;
