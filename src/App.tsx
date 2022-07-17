import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/form-card";
import FormFamily from "./components/forms/family";
import FormMember from "./components/forms/member";
import FormRelation from "./components/forms/relation";
import SpeedDial from "./components/speeddial";
import Tree from "./components/tree";
import dataBuilder from "./components/tree/dataBuilder";
import Store, { setRelations } from "./lib/manager";
import { ITreeNode } from "./components/tree/definitions";
import { getAllRelations } from "./lib/data";

interface ICardContent 
{
  title: string,
  content: JSX.Element
}

const App = () => {
  const [cardContent, setCardContent] = useState<ICardContent>();
  const [relationsLoaded, setRelationsLoaded] = useState(false);
  const [data, setData] = useState<ITreeNode>();

  const cleanFormContent = () => setCardContent(undefined);

  const onCardClose = () => {
    cleanFormContent();
  }

  const onSpeedDialClick = (id: number) => {
    switch (id)
    {
      case 1:
        setCardContent({
          title: "Member",
          content: <FormMember onClose={onCardClose} />
        });
        break;
      case 2:
        setCardContent({
          title: "Family",
          content: <FormFamily onClose={onCardClose} />
        });
        break;
      case 3:
        setCardContent({
          title: "Relation",
          content: <FormRelation onClose={onCardClose} />
        });
        break;
    
      default:
        cleanFormContent();
        break;
    }
  }

  useEffect(() => {
    getAllRelations()
      .then(rels => {
        setRelations(rels)
        setRelationsLoaded(Array.isArray(rels));
      })
      .catch(error => console.error);
  }, []);

  useEffect(() => {
    console.log("Store", Store);
    if(Store.relations.length > 0)
    {
      dataBuilder(Store.relations)
        .then(setData)
        .catch(error => console.error("Data builder", error));
    }
  }, [relationsLoaded]);

  return (
    <div className="bg-blue-500 w-full h-screen">
      <div className="absolute w-full h-full bg-blue-500">
        {/* Área de árbol */}
        <div className="absolute w-full h-full">
          <Tree data={data} />
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
