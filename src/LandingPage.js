import { Flex, Link, Image, Input, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Menu, MenuButton, Select, useToast } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import Axios, * as others from 'axios';

const LandingPage = () => {

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
            <Flex direction={'row'} justifyContent = {'center'} alignItems = {'center'}>
                <Flex width={'50vw'} direction={'column'} alignItems = {'center'}>
                    <Text color={'white'} fontSize = {'5vw'} fontWeight = {400}>
                        Object Detection
                    </Text>
                    <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'7vw'} fontWeight = {400} as = "i">
                        Evolved.
                    </Text>
                    <Text color={'white'} fontWeight = {'300'} fontSize = {'1.3vw'}>
                        Objects AI can detect various objects that are given to the <br/> camera by using tensorflow and other significant API's! <br/>Objects AI also greatly helps solve social inequality problems!
                    </Text>
                    <br/>
                    <Flex direction={'row'} gap = {'2vw'} alignItems = {'center'} justifyContent = {'center'}>
                        <Link href = {"/Playground"} background={'transparent'} padding={4} color={'white'} border = {'0.3px solid white'} borderRadius = {25} fontSize = {'1.4vw'} paddingLeft = {8} paddingRight = {8}>
                            Playground
                        </Link>
                        <Link onClick={(e) => {
                            window.location.href = "mailto:ben.sloutsky@gmail.com";
                            e.preventDefault();
                        }} background={'transparent'} padding={4} color={'white'} border = {'0.3px solid white'} borderRadius = {25} fontSize = {'1.4vw'} paddingLeft = {8} paddingRight = {8}>
                            Contact
                        </Link>
                    </Flex>
                </Flex>
                <Flex width={'50vw'}>
                    <Image src={require('./images/circ.gif')} borderRadius = {'50%'} />
                </Flex>
            </Flex>
            <br/><br/>
            <Flex direction={'column'} alignItems = {'center'} backgroundColor = {'#202020'} width = {'90vw'} borderRadius = {20} marginLeft = {'5vw'} padding = {10}>
                <Text color={'white'} fontSize = {'3.3vw'} fontWeight = {300}>Lifecycle Behind Object Detection</Text><br/>
                <Text color={'white'} fontSize = {'1.3vw'} fontWeight = {200}>Objects AI mission is to predict as many possible objects in the frame as possible, and also be able to be as specific as possible about an object!</Text>
                <br/><br/>
                <Image width={'80%'} height = {'80%'} src = {require('./images/Process.png')} />
            </Flex>

            <br/><br/>

            <Flex direction={'row'} justifyContent = {'center'} alignItems = {'center'} borderRadius = {20} marginLeft = {'5vw'} padding = {10} width = {'90vw'}>
                <Flex direction={'column'} width = {'50vw'} alignItems = {'center'} justifyContent = {'center'}>
                    <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'}>
                        <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'3vw'} fontWeight = {400}>Detect&nbsp;</Text>
                        <Text color={'white'} fontSize = {'3vw'} fontWeight = {400}>Objects&nbsp;in&nbsp;Frame</Text>
                    </Flex>
                    <br/>
                    <Text color={'white'} fontSize = {'1.5vw'} width = {'40vw'} fontWeight = {200}>Using Objects AI you will have the ability to detect every single object including living and non living creatures. Some of the functionalities are still in development but are available in playground!</Text>
                </Flex>
                <Flex width = {'40vw'}>
                    <Image src={require('./images/obj1.png')} borderRadius = {20} />
                </Flex>
            </Flex>

            <br/><br/>

            <Flex direction={'row'} justifyContent = {'center'} alignItems = {'center'} backgroundColor = {'#202020'} borderRadius = {20} marginLeft = {'5vw'} padding = {10} width = {'90vw'}>
                <Flex width = {'40vw'}>
                    <Image src={require('./images/obj2.png')} borderRadius = {20} />
                </Flex>
                <Flex direction={'column'} width = {'50vw'} alignItems = {'center'} justifyContent = {'center'}>
                <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'}>
                        <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'3vw'} fontWeight = {400}>Specific&nbsp;</Text>
                        <Text color={'white'} fontSize = {'3vw'} fontWeight = {400}>Analysis&nbsp;of&nbsp;Objects</Text>
                    </Flex>
                    <br/>
                    <Text color={'white'} fontSize = {'1.5vw'} width = {'40vw'} fontWeight = {200}>Using Objects AI you will have the ability to detect every single object including living and non living creatures. Some of the functionalities are still in development but are available in playground!</Text>
                </Flex>
                
            </Flex>
            <br/><br/><br/><br/>
            <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'} marginLeft = {'5vw'}>
                
                <Flex direction={'column'} width = {'50vw'} alignItems = {'center'} justifyContent = {'center'}>
                    <Text color={'white'} fontSize = {'5vw'} fontWeight = {400}>What will be used to create this?</Text>
                    <Text color={'white'} fontSize = {'1.3vw'} fontWeight = {200}>In order to create this project the javascript version of tensorflow will be used. Additionally, other API's and libraries will be used such as object detection libraries in order to analyze objects! In the future, hopefully python API's will be created in order to solve object detection in this project!</Text>
                </Flex>
                <Flex width={'50vw'} alignItems = {'center'} justifyContent = {'center'}>
                    <Image src={require('./images/Neuralnet.gif')} />
                </Flex>
            </Flex>
            <br/><br/><br/><br/><br/><br/>
            <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} backgroundColor = {'#202020'} width = {'90vw'} padding = {10} marginLeft = {'5vw'} borderRadius = {20}>
                <Text color={'white'} fontSize = {'3vw'} fontWeight = {300}>Start Now or Have Any Questions?</Text>
                <br/><br/>
                <Flex direction={'row'} gap = {'2vw'} alignItems = {'center'} justifyContent = {'center'}>
                    <Link backgroundColor={'#000'} padding={4} color={'white'} border = {'0.3px solid white'} borderRadius = {25} fontSize = {'1.4vw'} paddingLeft = {8} paddingRight = {8}>
                        Playground
                    </Link>
                    <Link onClick={(e) => {
                        window.location.href = "mailto:ben.sloutsky@gmail.com";
                        e.preventDefault();
                    }} backgroundColor={'#000'} padding={4} color={'white'} border = {'0.3px solid white'} borderRadius = {25} fontSize = {'1.4vw'} paddingLeft = {8} paddingRight = {8}>
                        Contact
                    </Link>
                </Flex>
            </Flex>
            <br/><br/><br/><hr/><br/>
            <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'}>
                <Text color={'white'}>© Copyright KatyYouthHacks, Objects AI inc. 2022</Text>
            </Flex>
            <br/>
        </Flex>
    );
}

export default LandingPage;