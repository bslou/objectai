import { Flex, Link, Image, Input, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Menu, MenuButton, Select, useToast } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import Axios, * as others from 'axios';


const Solutions = () => {


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
            <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'} marginLeft = {'5vw'} width = {'90vw'}>
              <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} width = {'50vw'}>
                <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'}>
                    <Text color={'white'} fontSize = {'5vw'} fontWeight = {300}>Why&nbsp;is&nbsp;it&nbsp;</Text>
                    <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'5vw'} fontWeight = {300}>useful</Text>
                    <Text color={'white'} fontSize = {'5vw'} fontWeight = {300}>?</Text>
                </Flex>
                <br/>
                <Text color={'white'} fontSize = {'1.5vw'} fontWeight = {200}>
                  This product is useful because it provides great research and foundation for future AI projects to come. Labels especially object labeling and detecting will be crucial for future advancements such as video image object detection, and an AI coach (for instance)! Additionally, this product provides people with a service for identifying what various projects are that are in the frame!
                </Text>
              </Flex>
              <Flex width={'40vw'} alignItems = {'center'} justifyContent = {'center'}>
                <Image src={require('./images/stars.gif')} />
              </Flex>
            </Flex>


            <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'} marginLeft = {'5vw'} width = {'90vw'} gap = {'5vw'}>
              <Flex width={'40vw'} alignItems = {'center'} justifyContent = {'center'}>
                  <Image src={require('./images/data.png')} />
                </Flex>
              <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} width = {'50vw'}>
                <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'}>
                    <Text color={'white'} fontSize = {'5vw'} fontWeight = {300}>Why&nbsp;AI's&nbsp;future&nbsp;is&nbsp;</Text>
                    <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize = {'5vw'} fontWeight = {300}>bright</Text>
                    <Text color={'white'} fontSize = {'5vw'} fontWeight = {300}>!</Text>
                </Flex>
                <br/>
                <Text color={'white'} fontSize = {'1.5vw'} fontWeight = {200}>
                  The AI's future is bright because throughout the next few months more and more data will be gathered based on solving problems such as these, and creating and teaching the computer with new solutions. Additionally, the computer will become way more powerful, so it will do a lot more of the logical stuff for humans that people cannot do.
                </Text>
              </Flex>
            </Flex>
            <br/><br/><br/>

            <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'} marginLeft = {'5vw'} width = {'90vw'} gap = {'10vw'}>
              
              <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} width = {'50vw'}>
                <Flex direction = {'row'} justifyContent = {'center'} alignItems = {'center'}>
                    <Text color={'white'} fontSize = {'5vw'} fontWeight = {300}>Solving&nbsp;various&nbsp;problems?</Text>
                </Flex>
                <br/>
                <Text color={'white'} fontSize = {'1.5vw'} fontWeight = {200}>
                  Object detection helps solve various problems in the society. For example, through object detection the AI can figure out what conditions and parental control causes children to be a certain way. Additionally, detecting objects help with improving sports techinque such as shooting a basketball, as in the future, various parts of the body such as the elbows and knees can be detected by the machine, and it can help improve shooting form! The problem that is being analyzed particularly though is social inequality!
                </Text>
              </Flex>
              <Flex width={'30vw'} alignItems = {'center'} justifyContent = {'center'}>
                <Image src={require('./images/problem.png')} />
              </Flex>
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

export default Solutions;