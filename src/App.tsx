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
import Store, { setRelations, setMembers, setSelectedFamily as globalSelectedFamily, 
  addMember, addRelation, getRelations, getMembers } from "./lib/manager";
import { ITreeNode } from "./components/tree/definitions";
import { IFamily, IFamilyMember } from "./lib/data/definitions";
import { getAllRelations, getFamilyMembers } from "./lib/data";
import dataBuilder from "./components/tree/dataBuilder";

interface ICardContent 
{
  title: string,
  content: JSX.Element
}

const App = () => {
  const [cardContent, setCardContent] = useState<ICardContent>();
  const [selectedFamily, setSelectedFamily] = useState<IFamily | undefined>(Store.selectedFamily);
  const [nodes, setNodes] = useState<ITreeNode[]>();
  const [loaded, setLoaded] = useState(true);

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
          content: <FormSelectFamily onSelect={selectFamily} 
            selectedFamily={selectedFamily}
            onClose={onCardClose} />
        });
        break;
    
      default:
        cleanFormContent();
        break;
    }
  }

  const selectFamily = (family: IFamily) => {
    globalSelectedFamily(family);
    setSelectedFamily(family);
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

      createNodes();
    }
    catch(error)
    {
      console.error("Load data", error);
    }
  }

  const createNodes = async() => {
    try
    {
      const data = await dataBuilder(getMembers() as IFamilyMember[], getRelations());
      console.log("New data", data);
      setNodes(data);
    }
    catch(error)
    {
      console.error("createNodes", error);
    }
  }

  const addFamilyMember = (data: any) => {
    if(!(data && data.detail.familyMember)) return;
    const fm = {
      ... data.detail.familyMember,
      member: data.detail.member
    }
    addMember(fm);
    createNodes();
    setLoaded(l => l = false);
  }

  const addNewRelation = (data: any) => {
    if(!(data && data.detail.relation)) return;
    addRelation(data.detail.relation);
    createNodes();
    setLoaded(l => l = false);
  }

  useEffect(() => {
    window.addEventListener("new_member_added", addFamilyMember);
    window.addEventListener("new_relation_added", addNewRelation);

    return () => {
      window.removeEventListener("new_member_added", addFamilyMember);
      window.removeEventListener("new_relation_added", addNewRelation);
    }
  }, []);

  useEffect(() => {
    loadInfo();
  }, [selectedFamily]);

  useEffect(() => {
    if(!loaded)
    {
      setTimeout(() => {
        setLoaded(true);
      }, 200);
    }
  }, [loaded]);

  return (
    <div className="bg-blue-500 w-full h-screen">
      <div className="absolute w-full h-full bg-blue-500">
        {/* Área de árbol */}
        <div className="absolute w-full h-full bg-gray-900">
          {
            nodes && loaded ?
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
