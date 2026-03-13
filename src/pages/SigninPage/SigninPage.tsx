import { ChevronDown, ChevronLeft } from "lucide-react"
import styles from './SigninPage.module.css'
import React, { useEffect, useRef, useState } from "react"

type possibleErrs = {
    firstName: boolean,
    lastName: boolean,
    bday: {
        month: boolean,
        day: boolean,
        year: boolean
    },
    email: boolean,
    password: boolean,
}

type typeTouch = {
    fName: boolean,
    lName: boolean,
    email: boolean,
    password: boolean
}

const SigninPage = () => {
    //General:
    const [errs, setErrs] = useState<possibleErrs>({
        firstName: false,
        lastName: false,
        bday: {
            month: false,
            day: false,
            year: false
        },
        email: false,
        password: false
    })
    
    //Name:
    const [touched, setTouched] = useState<typeTouch>({fName: false, lName:false, email: false, password: false})
    const fnameRef = useRef<HTMLInputElement>(null)
    const lnameRef = useRef<HTMLInputElement>(null)

    // Bday
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const currentYear = new Date().getFullYear();
    const startYear = 1900;

    const [selected, setSelectedMonth] = useState<string | null>(null)
    const [selectedDay, setSelectedDay] = useState<number | null>(null)
    const [selectedYear, setSelectedYear] = useState<number | null>(null)

    const [openMonth, setOpenMonth] = useState(false)
    const [openDay, setOpenDay] = useState(false);
    const [openYear, setOpenYear] = useState(false);

    const monthRef = useRef<HTMLDivElement>(null);
    const dayRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);

    //Gender:
    const genderRef = useRef<HTMLDivElement>(null)
    const [openGender, setOpenGender] = useState(false)
    const [selectedGender, setSelectedGender] = useState<string | null>(null)

    //Email:
    const emailRef = useRef<HTMLInputElement>(null)

    //Password:
    const passRef = useRef<HTMLInputElement>(null)

    const handleSelectMonth = (e: React.MouseEvent<HTMLLIElement>, value: string) => {
        e.stopPropagation();
        setOpenMonth(false)
        setSelectedMonth(value)
    }

    const handleSelectDay = (e: React.MouseEvent<HTMLLIElement>, value: number) => {
        e.stopPropagation();
        setOpenDay(false);
        setSelectedDay(value);
    }

    const handleSelectYear = (e: React.MouseEvent<HTMLLIElement>, value: number) => {
        e.stopPropagation();
        setOpenYear(false);
        setSelectedYear(value)
    }

    const handleSelectGender = (e: React.MouseEvent<HTMLLIElement>, value: string) => {
        e.stopPropagation();
        setOpenGender(false);
        setSelectedGender(value);
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent){
            //Name
            if(
                touched.fName &&
                fnameRef.current &&
                !fnameRef.current.contains(e.target as Node) && fnameRef.current.value.trim() == ""
            ){  
                setErrs(prev => ({...prev, firstName: true}))
            }

            if(
                touched.lName &&
                lnameRef.current &&
                !lnameRef.current.contains(e.target as Node) && lnameRef.current.value.trim() == ""
            ){
                setErrs(prev => ({...prev, lastName: true}))
            }
            
            // Bday
            if(
                monthRef.current &&
                !monthRef.current.contains(e.target as Node)
            ){
                setOpenMonth(false);
            }

            if(
                dayRef.current &&
                !dayRef.current.contains(e.target as Node)
            ){
                setOpenDay(false);
            }

            if(
                yearRef.current &&
                !yearRef.current.contains(e.target as Node)
            ){
                setOpenYear(false)
            }

            // Gender:
            if(
                genderRef.current && 
                !genderRef.current.contains(e.target as Node)
            ){
                setOpenGender(false)
            }

            //Email:
            if(
                touched.email &&
                emailRef.current &&
                !emailRef.current.contains(e.target as Node) &&
                emailRef.current.value.replace(/[ ]/g, "") == ""
            ){
                setErrs(prev => ({...prev, email: true}))
            }

            //Password:
            if(
                touched.password &&
                passRef.current && 
                !passRef.current.contains(e.target as Node) &&
                passRef.current.value.trim() == ""
            ){
                setErrs(prev => ({...prev, password: true}))
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [touched])

  return (
    <main className={styles.mainContent}>
      <form className={styles.signInForm}>
        <div >
            <a href="/" style={{textDecoration: "none", color: "black"}} className={styles.backBtn}>
                <ChevronLeft/>
            </a>
        </div>
        <h1>Get started on PeopleSpace</h1>
        <p>Create an account to connect with friends, family and communities of people who share your interests.</p>
        <div className={styles.userInfo}>
            <fieldset>
                <legend>Name</legend>
                <div className={styles.regVertStyle}>
                    <input ref={fnameRef} onFocus={() => setTouched(prev => ({...prev, fName: true}))} type="text" name="firstName" placeholder="First Name" style={{borderColor: errs.firstName ? "red" : ''}} onChange={() => setErrs(prev => ({...prev, firstName: false}))}/>
                    <input ref={lnameRef} onFocus={() => setTouched(prev => ({...prev, lName: true}))} type="text" name="lastName" placeholder="last Name" style={{borderColor: errs.lastName ? "red" : ''}} onChange={() => setErrs(prev => ({...prev, lastName: false}))}/>
                </div>
            </fieldset>

            <fieldset>
                <legend>Birthday</legend>
                <div className={styles.regVertStyle}>
                    <div ref={monthRef} tabIndex={0} role="listbox" aria-expanded={openMonth} className={styles.sel} onClick={() => setOpenMonth(prev => !prev)} 
                        onKeyDown={(e) => {
                            if(e.key === "Enter" || e.key === " "){
                                e.preventDefault();
                                setOpenMonth(true)
                            }
                        }}>
                        {selected ?? "Month"}
                        {openMonth && (
                            <ul role="listbox" className={styles.optionCont} style={{borderRadius: "20px"}}>
                                {months.map((item) => (
                                    <li role="option" aria-selected={selected === item} tabIndex={0} 
                                        onKeyDown={(e) => {
                                            if(e.key === "Enter" || e.key === " "){
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setOpenMonth(false);
                                                setSelectedMonth(item);
                                            }
                                        }}
                                        onClick={(e) => {
                                            handleSelectMonth(e, item)
                                        }} className={styles.optionlist} key={item} 
                                    >{item}</li>
                                ))}
                            </ul>
                        )}
                        <ChevronDown className={styles.dropDownIcon}/>
                    </div> 

                    <div ref={dayRef} tabIndex={0} role="listbox" aria-expanded={openDay} className={styles.sel} onClick={() => setOpenDay(prev => !prev)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter" || e.key === " "){
                                e.preventDefault();
                                setOpenDay(true)
                            }
                        }}    
                    >
                        {selectedDay ?? "Day"}
                        {openDay && (
                            <ul role="listbox" className={styles.optionCont} style={{borderRadius: "20px"}}>
                                {selected == "February" ? (
                                    [...Array(29)].map((_, i) => (
                                        <li role="option" aria-selected={selectedDay === i + 1} tabIndex={0} onClick={(e) => {handleSelectDay(e, i + 1)}} key={i + 1} value={i + 1} className={styles.optionlist}
                                            onKeyDown={(e) => {
                                                if(e.key === "Enter" || e.key === " "){
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setOpenDay(false);
                                                    setSelectedDay(i + 1);
                                                }
                                            }}
                                        >
                                            {i + 1}
                                        </li>
                                    ))
                                ) : selected == "April" || selected == "June" || selected == "September" || selected == "November" ? (
                                    [...Array(30)].map((_, i) => (
                                        <li role="option" aria-selected={selectedDay === i} tabIndex={0} onClick={(e) => {handleSelectDay(e, i + 1)}} key={i + 1} value={i + 1} className={styles.optionlist}
                                            onKeyDown={(e) => {
                                                if(e.key === "Enter" || e.key === " "){
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setOpenDay(false);
                                                    setSelectedDay(i + 1);
                                                }
                                            }}
                                        >
                                            {i + 1}
                                        </li>
                                    ))
                                ):(
                                    [...Array(31)].map((_, i) => (
                                        <li role="option" aria-selected={selectedDay === i} tabIndex={0} onClick={(e) => {handleSelectDay(e, i + 1)}} key={i + 1} value={i + 1} className={styles.optionlist}
                                            onKeyDown={(e) => {
                                                if(e.key === "Enter" || e.key === " "){
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setOpenDay(false);
                                                    setSelectedDay(i + 1);
                                                }
                                            }}
                                        >
                                            {i + 1}
                                        </li>
                                    ))
                                )}
                            </ul>
                        )}
                        <ChevronDown className={styles.dropDownIcon}/>
                    </div> 

                    <div ref={yearRef} tabIndex={0} role="listbox" aria-expanded={openYear}  className={styles.sel} onClick={() => setOpenYear(prev => !prev)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter" || e.key === " "){
                                e.preventDefault();
                                setOpenYear(true)
                            }
                        }}
                    >
                        {selectedYear ?? "Year"}
                        {openYear && (
                            <ul role="listbox" className={styles.optionCont} style={{borderRadius: "20px"}}>
                                {Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
                                    const year = currentYear - i;
                                    return (
                                        <li role="option" aria-selected={selectedYear === year} tabIndex={0} onClick={(e) => handleSelectYear(e, year)} key={year} value={year} className={styles.optionlist}
                                            onKeyDown={(e) => {
                                                if(e.key === "Enter" || e.key === " "){
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setOpenYear(false);
                                                    setSelectedYear(year);
                                                }
                                            }}
                                        >
                                            {year}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        <ChevronDown className={styles.dropDownIcon}/>
                    </div> 
                </div>
            </fieldset>

            <fieldset>
                <legend>Gender</legend>
                <div className={styles.regVertStyle}>
                    <div tabIndex={0} role="listbox" aria-expanded={openGender} ref={genderRef} className={styles.sel} onClick={() => setOpenGender(prev => !prev)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter" || e.key === " "){
                                e.preventDefault();
                                setOpenGender(true)
                            }
                        }}    
                    >
                        {selectedGender ?? "Select your gender"}
                        <div>
                            {openGender && (
                                <ul role="listbox" className={styles.optionCont}>
                                    <li role="option" aria-selected={selectedGender === "Male"} tabIndex={0} onClick={(e) => handleSelectGender(e, "Male")} className={styles.optionlist}
                                        onKeyDown={(e) => {
                                            if(e.key === "Enter" || e.key === " "){
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setOpenGender(false);
                                                setSelectedGender("Male");
                                            }
                                        }}    
                                    >Male</li>
                                    <li role="option" aria-selected={selectedGender === "Female"} tabIndex={0} onClick={(e) => handleSelectGender(e, "Female")} className={styles.optionlist}
                                        onKeyDown={(e) => {
                                            if(e.key === "Enter" || e.key === " "){
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setOpenGender(false);
                                                setSelectedGender("Female");
                                            }
                                        }}       
                                    >Female</li>
                                </ul>
                            )}
                        </div>
                        <ChevronDown className={styles.dropDownIcon}/>
                    </div>
                    
                </div>
            </fieldset>

            <fieldset>
                <legend>Email</legend>
                <div className={styles.regVertStyle}>
                    <input ref={emailRef} onFocus={() => setTouched(prev => ({...prev, email: true}))} type="text" name="email" placeholder="Email" style={{borderColor: errs.email ? "red" : ''}} onChange={() => setErrs(prev => ({...prev, email: false}))}/>
                </div>
            </fieldset>
            
            <fieldset>
                <legend>Password</legend>
                <div className={styles.regVertStyle}>
                    <input ref={passRef} onFocus={() => setTouched(prev => ({...prev, password: true}))} type="text" name="firstName" placeholder="Password" style={{borderColor: errs.password ? "red" : ''}} onChange={() => setErrs(prev => ({...prev, password: false}))}/>
                </div>
            </fieldset>

            <div className={styles.btns}>
                <button className={styles.submitBtn}>Submit</button>
                <a href="/" className={styles.cancelCreate}>I already have an account</a>
            </div>
        </div>
      </form>
    </main>
  )
}

export default SigninPage
