import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/form-card";
import FormFamily from "./components/forms/family";
import FormMember from "./components/forms/member";
import FormRelation from "./components/forms/relation";
import FormSelectFamily from "./components/forms/selectFamily";
import SpeedDial from "./components/speeddial";
import Tree from "./components/tree";
import Store, { setRelations, setMembers } from "./lib/manager";
import { ITreeNode } from "./components/tree/definitions";
import { IFamily, IFamilyMember } from "./lib/data/definitions";
import { getAllRelations, getFamilyMembers } from "./lib/data";
import dataBuilder from "./components/tree/dataBuilder";

interface ICardContent 
{
  title: string,
  content: JSX.Element
}

const defaultSelected = {
  id: "d5ca8bc3-49de-423d-a4e3-b8f1cc2ef600", 
  name: "Baez", 
  notes: "Familia Baez"
}

const App = () => {
  const [cardContent, setCardContent] = useState<ICardContent>();
  const [selectedFamily, setSelectedFamily] = useState<IFamily | undefined>(defaultSelected);
  const [nodes, setNodes] = useState<ITreeNode[]>();
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
      case 4:
        setCardContent({
          title: "Family",
          content: <FormSelectFamily onSelect={setSelectedFamily} 
            selectedFamily={selectedFamily}
            onClose={onCardClose} />
        });
        break;
    
      default:
        cleanFormContent();
        break;
    }
  }

  const loadInfo = async() => 
  {
    try
    {
      if(!(selectedFamily && selectedFamily.id)) return;
      const promises = [
        getFamilyMembers(selectedFamily.id),
        getAllRelations()
      ];

      const [members, rels] = await Promise.all(promises);
      setMembers(members as IFamilyMember[] || []);
      setRelations(rels);

      const data = await dataBuilder(Store.members as IFamilyMember[], Store.relations);
      setNodes(data);
    }
    catch(error)
    {
      console.error("Load data", error);
    }
  }

  useEffect(() => {
    loadInfo();
  }, [selectedFamily]);

  return (
    <div className="bg-blue-500 w-full h-screen">
      <div className="absolute w-full h-full bg-blue-500">
        {/* Área de árbol */}
        <div className="absolute w-full h-full bg-gray-900">
          {
            nodes ?
              <Tree nodes={nodes} />
              :
              <div></div>
          }
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
