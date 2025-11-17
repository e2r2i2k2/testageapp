import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native';
import { styles } from '../_layout';
import ContentLine from '../format/types';
import { getPageContent } from './DataLoader';
import handleError from './ErrorHandler';

function ContentFrame() {
  const [content, setContent] = useState<ContentLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);  
  const [inputValue, setInputValue] = useState<string>('');

  // Load content on first page load
  useEffect(() => {    
    const loadContent = async () => {      
      const pageContent = await getPageContent("");
      setContent(pageContent);
      setIsLoading(false);
    };
    loadContent();
  }, []);

  // Render the content based on the JSON data
  // There is probably a good libary to replace this somewhere, but for this code sample, I wrote a simple one.
  const renderItem = (item: ContentLine, key : number) => {
    switch (item.type) {
      case 'heading':
        return <Text key={key} style={styles.heading}>{item.data}</Text>;
      case 'text':
        return <Text key={key} style={styles.text}>{item.data}</Text>;
      case 'button':
        // There is only one button type and action now, so we can just assign the function here directly.
        // With more actions, we could add more params to better set the actions.
        // At a minimum though, we shouldn't accept code, and only accept whitelisted endpoints.
        return <Button key={key} title={item.data} onPress={tryGetAge}/>;
      case 'textInput':
        // Same as with buttons, there is just one input type here.
        return <TextInput
          key={key}
          value={inputValue}
          style={styles.inputField}
          onChangeText={text => setInputValue(text)}/>;
          case 'break':
            return <br />
      default:
        handleError("Unknown item.type: ${item.type}");
        return <div key={key}/>;
    }
  };
  
  // Action for user trying to get age based on name
  const tryGetAge = async () => {
    // Currently only supports ASCII names

    // Return early if no text, since there is nothing to send
    if(inputValue.length == 0){
      handleError("Empty Name");
      return;
    }

    // Clean and limit input
    let cleanedName = inputValue.replace(/\W/g, '');    
    console.log(`Name cleaned to ${cleanedName}`);

    // There is no remaining text meaning the user had input, but it was all removed
    if(cleanedName.length == 0){
      handleError("Invalid name input. Use A-z letters only.");
      return;
    }

    // Send data and await a response
    setIsLoading(true);
    const newContent = await getPageContent(cleanedName);
    setContent(newContent);
    setIsLoading(false);
  }

  return isLoading ? (
    <div>
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator style={styles.container} />
    </div>
  ) : (
    <div style={styles.contentContainer}>
      {content.map((item, key) => renderItem(item, key))}
    </div>
  );
};

export default ContentFrame;