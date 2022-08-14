import { Flex, Link, Image, Input, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Menu, MenuButton, Select, useToast } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import Axios, * as others from 'axios';


const Product = () => {

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
            <br/><br/>
            <Flex backgroundColor={'#202020'} direction = {'row'} justifyContent = {'center'} alignItems = {'center'} marginLeft = {'5vw'} width = {'90vw'} padding = {18} borderRadius = {20}>
                <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} width = {'45vw'}>
                    <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'}>
                        <Text color={'white'} fontSize = {'3vw'} fontWeight = {500}>What&nbsp;is&nbsp;the point&nbsp;of&nbsp;this&nbsp;</Text>
                        <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'3vw'} fontWeight = {500}>product</Text>
                        <Text color={'white'} fontSize = {'3vw'} fontWeight = {500}>?</Text>
                    </Flex>
                    <br/>
                    <Text color={'white'} fontSize = {'1.5vw'} fontWeight = {200}>This product is intended to further develop AI advancements using labeled data. Labeled data is a grand trend in the modern days and can help revolutionize the world for the better in the future! Additionally, people sometimes do not know the name of a certain object, that is why it is important for there to be an object detector and identifier.</Text>
                </Flex>
                <Flex width={'40vw'} alignItems = {'center'} justifyContent = {'center'}>
                    <Image src = {require('./images/tenor.gif')} borderRadius = {'50%'}/>
                </Flex>
            </Flex>

            <br/><br/><br/><br/>

            <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'} gap = {'5vw'} marginLeft = {'5vw'}>
                <Flex width={'40vw'} alignItems = {'center'} justifyContent = {'center'}>
                    <Image src = {require('./images/maze.gif')}/>
                </Flex>
                <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} width = {'40vw'}>
                    <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'}>
                        <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'3vw'} fontWeight = {500}>Future&nbsp;</Text>
                        <Text color={'white'} fontSize = {'3vw'} fontWeight = {500}>of&nbsp;the&nbsp;product?</Text>
                    </Flex>
                    <br/>
                    <Text color={'white'} fontSize = {'1.5vw'} fontWeight = {200}>The future of the product is exciting. It is decided that there will be an API in the future (probably in python, javascript, c++, and maybe in other languages) where we will outsource it and sale it for little to no money. There will also be more advance object detection and other labeling AI features which are uncommon in the market today! It is also planned that there will be labels for multiple languages, not just English for object detection!</Text>
                </Flex>
            </Flex>

            <br/><br/><br/>


            <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'} gap = {'5vw'} marginLeft = {'5vw'}>
                <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} width = {'40vw'}>
                    <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'}>
                        <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'3vw'} fontWeight = {500}>Who&nbsp;</Text>
                        <Text color={'white'} fontSize = {'3vw'} fontWeight = {500}>worked&nbsp;on&nbsp;this&nbsp;product?</Text>
                    </Flex>
                    <br/>
                    <Text color={'white'} fontSize = {'1.5vw'} fontWeight = {200}>This product was created by me, Benjamin Sloutsky (18 years old)! I started working on this project on August 13, 2022, and will submit it on August 14, 2022 for the KatyYouth Hackathon. I am excited to be a part of the hackathon, and loved working on this project. Unfortunately, I did not have enough time to make it be the best possible product ever, but I really enjoyed the process!</Text>
                </Flex>
                <Flex width={'40vw'} alignItems = {'center'} justifyContent = {'center'}>
                    <Image src = {require('./images/benya.jpeg')} borderRadius = {'50%'}/>
                </Flex>
            </Flex>


            <br/><br/><br/>

            <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} width = {'70vw'} marginLeft = {'15vw'} padding = {10} borderRadius = {20} backgroundColor = {'#202020'}>
                <Text color={'white'} fontWeight = {600} fontSize = {'4vw'}>😊 Greatly Appreciate Feedback!</Text>
                <br/> 
                <Text color={'white'} fontWeight = {200} fontSize = {'1.3vw'}>Hello, thank you for looking through parts of our web application and our AI model! What do you think of the application, do you like it, dislike it, have strong opinions, are just scrolling through it for fun? In any case, feedback would greatly be appreciated, and I could not thank you enough if you would leave feedback on the project! I want to make this the best possible thing ever, and it cannot be accomplished without critical feedback from the people using it themselves! </Text>
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeOSCMUyihvEL9lnUszUymutNYGjHbBjilMoM0DleHihDyrFg/viewform?usp=sf_link" target={"_blank"} color = "white" background = '#000' padding={4} border = {'0.3px solid white'} borderRadius = {25} fontSize = {'1.4vw'} paddingLeft = {8} paddingRight = {8}>
                    Feedback
                </Link>
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

export default Product;