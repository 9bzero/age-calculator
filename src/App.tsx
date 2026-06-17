import{useState,useMemo}from'react'
  export default function App(){
    const[dob,setDob]=useState("1998-01-01")
    const[target,setTarget]=useState(new Date().toISOString().slice(0,10))
    const result=useMemo(()=>{
      const d=new Date(dob),t=new Date(target)
      if(d>t)return null
      let y=t.getFullYear()-d.getFullYear(),m=t.getMonth()-d.getMonth(),dy=t.getDate()-d.getDate()
      if(dy<0){m--;const prev=new Date(t.getFullYear(),t.getMonth(),0);dy+=prev.getDate()}
      if(m<0){y--;m+=12}
      const totalDays=Math.floor((t.getTime()-d.getTime())/86400000)
      const hours=totalDays*24,mins=hours*60,secs=mins*60
      const nextBday=new Date(t.getFullYear(),d.getMonth(),d.getDate())
      if(nextBday<=t)nextBday.setFullYear(t.getFullYear()+1)
      const daysToNext=Math.floor((nextBday.getTime()-t.getTime())/86400000)
      const dayOfWeek=d.toLocaleDateString("en-US",{weekday:"long"})
      const age=y*365+m*30+dy
      return{y,m:Math.abs(m),dy:Math.abs(dy),totalDays,hours,mins,secs,daysToNext,dayOfWeek,age}
    },[dob,target])
    const MILESTONES=[1000,5000,10000,20000,50000,100000]
    const next=result?MILESTONES.find(n=>n>result.totalDays):null
    return(
      <div style={{minHeight:"100vh",fontFamily:"Inter,system-ui,sans-serif",color:"#e2e8f0",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:"100%",maxWidth:580}}>
          <h1 style={{fontWeight:800,fontSize:"1.75rem",marginBottom:"1.5rem",textAlign:"center",color:"#f8fafc"}}>🎂 Age Calculator</h1>
          <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:12,padding:"1.5rem",marginBottom:"1.5rem"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
              {[{l:"Date of Birth",v:dob,set:setDob},{l:"Calculate to",v:target,set:setTarget}].map(({l,v,set})=>(
                <div key={l}>
                  <div style={{color:"#94a3b8",fontSize:"0.82rem",marginBottom:"0.4rem"}}>{l}</div>
                  <input type="date" value={v} onChange={e=>set(e.target.value)} style={{width:"100%",background:"#0f172a",border:"1px solid #334155",borderRadius:6,padding:"0.55rem 0.75rem",color:"#e2e8f0",outline:"none",fontSize:"0.9rem"}}/>
                </div>
              ))}
            </div>
          </div>
          {result?(
            <>
              <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:16,padding:"2rem",textAlign:"center",marginBottom:"1rem"}}>
                <div style={{display:"flex",justifyContent:"center",gap:"1.5rem",marginBottom:"1rem"}}>
                  {[{v:result.y,l:"Years",c:"#38bdf8"},{v:result.m,l:"Months",c:"#22c55e"},{v:result.dy,l:"Days",c:"#f59e0b"}].map(({v,l,c})=>(
                    <div key={l} style={{textAlign:"center"}}>
                      <div style={{fontSize:"2.8rem",fontWeight:900,color:c,lineHeight:1}}>{v}</div>
                      <div style={{color:"#475569",fontSize:"0.8rem",marginTop:"0.25rem"}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",marginBottom:"1rem"}}>
                {[{l:"Total Days",v:result.totalDays.toLocaleString(),c:"#f1f5f9"},{l:"Total Hours",v:result.hours.toLocaleString(),c:"#94a3b8"},{l:"Born on",v:result.dayOfWeek,c:"#a855f7"},{l:"Next Birthday",v:"In "+result.daysToNext+" days",c:"#f59e0b"}].map(({l,v,c})=>(
                  <div key={l} style={{background:"#111827",border:"1px solid #1e293b",borderRadius:10,padding:"1rem"}}>
                    <div style={{color:"#475569",fontSize:"0.75rem",marginBottom:"0.25rem"}}>{l}</div>
                    <div style={{fontWeight:700,color:c,fontSize:"0.95rem"}}>{v}</div>
                  </div>
                ))}
              </div>
              {next&&<div style={{background:"#0c1a2e",border:"1px solid #1e40af",borderRadius:10,padding:"1rem",textAlign:"center",color:"#93c5fd",fontSize:"0.85rem"}}>🎯 Milestone: {next.toLocaleString()} days in <strong>{(next-result.totalDays).toLocaleString()} days</strong></div>}
            </>
          ):<div style={{textAlign:"center",color:"#ef4444",padding:"1.5rem"}}>Please select a valid date of birth before the target date.</div>}
        </div>
      </div>
    )
  }