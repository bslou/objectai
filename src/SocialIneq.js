import { Flex, Link, Image, Input, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Menu, MenuButton, Select, useToast } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import Axios, * as others from 'axios';

const SocialInequality = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [listOfUsers, setListOfUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [wrong, setWrong] = useState("");
    const toast = useToast()

    useEffect(() => {
        Axios.get("http://localhost:3001/getUsers").then((response) => {
          setListOfUsers(response.data);
        });
      }, []);
    
      const createUser = () => {
        Axios.post("http://localhost:3001/createUsers", {
          email
        }).then((response) => {
          setListOfUsers([
            ...listOfUsers,
            {
              email
            },
          ]);
        });
      };

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    function checkEmail(email){
        console.log(email);
        if (validateEmail(email)){
            setWrong('');
            if (listOfUsers === null) {

                toast({
                  title: 'Email registered.',
                  description: "Email is registered in the database",
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                })
                createUser();
          
              } else {
                
                
                Axios.get("http://localhost:3001/getUsers").then((response) => {
                  for (var i = 0; i < (response.data).length; i++){
                    if ((response.data)[i]['email'] === email){
                      toast({
                        title: 'Email is already registered.',
                        description: "Email is already registered...",
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                      })
                      return;
                    }
                  }
                  toast({
                    title: 'Email registered.',
                    description: "Email is registered in the database",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                  })
                  createUser();
                })
              }
        }else{
            setWrong('Email is incorrect!')
        }
    }
    return (
        <Flex direction={'column'} background={'rgb(0, 0, 0)'} width = {'100%'} height = {'100%'}>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Newsletter Subscription</ModalHeader>
                <ModalCloseButton />
                <Flex alignItems={'center'} direction = {'column'}>
                    <Text>Enter Your Email Here:</Text>
                    <Input type = "email" width={'80%'} value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                    <Text color={'red'}>{wrong}</Text>
                    <ModalFooter>
                        {/**Use Mongo and usestate for signup */}
                        <Button onClick={() => {
                            checkEmail(email)
                        }} variantColor="blue" mr={3}>
                        Sign Up
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </Flex>
                </ModalContent>
            </Modal>

            <Flex backgroundColor={'#101010'} direction={'row'} alignItems = {'center'} justifyContent = {'center'} borderBottom = {'0.5px solid #cbcbcb'} padding = {2}>
                <Image src={require('./images/logo.png')} width = {'3vw'} height = {'3vw'} />
                <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'2.2vw'} fontWeight = {900}>&nbsp;&nbsp;&nbsp;&nbsp;ObjectsAI&nbsp;&nbsp;</Text>
                <Text color={'white'} fontSize = {'1.7vw'} fontWeight = {400}>
                    is&nbsp;&nbsp;possible&nbsp;&nbsp;due&nbsp;&nbsp;to&nbsp;&nbsp;
                </Text>
                <Link href="https://katyhacks.org/" color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    <Image src = {require('./images/katyyouth.png')} width = {'21vw'} height = {'2vw'} />
                </Link>
            </Flex>
            <Flex direction={'row'} alignItems = {'center'} gap = {'2vw'} padding = {2}>
               <Link href="/" width={'12vw'} height = {'3vw'}>
                    <Image src = {require('./images/FirstNav.png')} />
               </Link>
               <Link href = {"/Product"} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Product
               </Link>
               <Link href = {"/Solutions"} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Solutions
               </Link>
               <Link href = {"/SocialInequality"} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Social Inequality
               </Link>
               <Link href = {"/Playground"} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Playground
               </Link>
               <Link onClick={onOpen} position={'absolute'} right = {'3vw'} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Join →
               </Link>
               <Link onClick={(e) => {
                    window.location.href = "mailto:ben.sloutsky@gmail.com";
                    e.preventDefault();
                }} position={'absolute'} right = {'9vw'} color={'white'} fontSize = {'1.3vw'} fontWeight = {400}>
                    Contact
               </Link>
            </Flex>
            <br/>
            <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'} marginLeft = {'5vw'} gap = {'5vw'}>
                <Flex alignItems={'center'} justifyContent = {'center'} width = {'40vw'}>
                    <Image src={require('./images/poor.png')} />
                </Flex>
                <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'}>
                    <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'} width = {'50vw'}>
                        <Text color={'white'} fontSize = {'3vw'} fontWeight = {300}>Why&nbsp;is&nbsp;social&nbsp;inequality&nbsp;</Text>
                        <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'3vw'} fontWeight = {300}>important</Text>
                        <Text color={'white'} fontSize = {'3vw'} fontWeight = {300}>?</Text>
                    </Flex>
                    <Text color={'white'} fontSize = {'1.5vw'} width = {'40vw'} fontWeight = {200}>
                        Social Inequality has been a problem in the world ever since money was created! People who work more but are working in the "unskilled labor force" find themselves earning significantly less pay than someone who is in the "skilled labor" industry. Additionally gentrification, is a common problem related to social inequality, where natives of a particular city are kicked out of their home and jobs due to people of a more profitable industry moving into the city! Majority of the people also feel unstable with their current financial situations... Children born in poorer families also tend to stay poor due to family financial situations!
                    </Text>
                </Flex>
            </Flex>

            <br/><br/><br/>

            <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'} marginLeft = {'5vw'} width = {'90vw'} gap = {'10vw'}>
              
              <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} width = {'50vw'}>
                <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'}>
                    <Text color={'white'} fontSize = {'3vw'} fontWeight = {300}>Solving&nbsp;social&nbsp;inequality?</Text>
                </Flex>
                <br/>
                <Text color={'white'} fontSize = {'1.5vw'} fontWeight = {200}>
                  Objects AI and object detection helps solve social inequality in the future, as parenting is crucial in creating a child, and various parenting methods can be tested by the computer to analyze what separates a successful and future richer child from a poorer child. For example, some parents may use a stick to punish their child, and it may (may: important word) be more effective than just verbally telling a child to do their work and improve their work habits. Additionally, priorities are important. For example, people into education and studying tend to earn more in the future than athletes (not all cases). Object detection relates to priorities as objects within a room express what a person prioritizes in their life. For example, a skateboard, basketball, and tennis racket shows that a person probably is more athletic and less into studies, while a person who has UC Berkley shirts, textbooks, and sticky notes in their shows a person more interested in their studies. Detecting objects can help parents educate themselves on how to better parent children in order to break the poverty cycle or in order to become successful people, while children can learn through this model and see what they should be prioritizing in order to have a higher chance at being successful!
                </Text>
              </Flex>
              <Flex width={'30vw'} alignItems = {'center'} justifyContent = {'center'}>
                <Image src={require('./images/poorrich.png')} />
              </Flex>
            </Flex>
            <br/><br/><br/>
            <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'}>
                <Text color={'white'} fontSize = {'3vw'} fontWeight = {300}>
                    What separates rich people from poor people!
                </Text>
                
                <iframe
                    src="https://www.youtube.com/embed/7uaHDmCHDsU"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    title="video"
                    width={'80%'}
                    height = {'500vh'}
                />
            </Flex>

            <br/><br/><br/>
            
            <hr/><br/>
            <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'}>
                <Text color={'white'}>© Copyright KatyYouthHacks, Objects AI inc. 2022</Text>
            </Flex>
            <br/>

        </Flex>
    );
}

export default SocialInequality;