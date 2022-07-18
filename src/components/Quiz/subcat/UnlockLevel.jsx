import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaUnlock } from "react-icons/fa";
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
const UnlockLevel = (data) => {
    const handleLockClick =()=>{
        toast.error("This Level is Locked. Play previous levels to unlock")
    }
    return (
        <>
            {data.count ?
                Array.from(Array(parseInt(data.count)), (e, i) => {
                    return (
                        <div className="custom-col-xxl col-xl-3 col-lg-3 col-md-3 col-4" key={i + 1}>
                            {(() => {
                                if (data.unlockedLevel >= (i + 1)) {
                                    return <Link to={{
                                        pathname: data.url, data: {
                                            category: data.category && data.category.id,
                                            subcategory: data.subcategory && data.subcategory.id,
                                            level: i + 1,
                                            unlockedLevel: data.unlockedLevel,
                                            maxLevel:data.subcategory && data.subcategory.maxlevel,
                                        }
                                    }} >
                                        <div className="unlock__levels__card mt-3" >
                                            <div className="card">
                                                <span className="level__icon open_lock mt-3 custom-icon">
                                                    <span className="fa-stack">
                                                        <FaUnlock className='fa-stack-2x' />
                                                        <strong className="fa-stack-1x text-dark">{i + 1}</strong>
                                                    </span>
                                                </span>
                                                <div className="questions d-flex">
                                                    <span className="font-weight-bold text-white"></span>
                                                    <p className="inner_que font-weight-bold text-white text-capitalize"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                } else {
                                    return <div className="unlock__levels__card mt-3" >
                                        <div className="card" onClick={handleLockClick}>
                                            <span className="level__icon mt-3 custom-icon">
                                                <span className="fa-stack">
                                                    <FaLock className='fa-stack-2x' />
                                                    <strong className="fa-stack-1x text-dark" >{i + 1}</strong>
                                                </span>
                                            </span>
                                            <div className="questions d-flex">
                                                <span className="font-weight-bold text-white"></span>
                                                <p className="inner_que font-weight-bold text-white text-capitalize"></p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            })()
                            }
                        </div>
                    )
                })
                :
                <div className='text-center'>
                    <Spinner animation="border" role="status"></Spinner>
                </div>
            }
        </>
    )
}
export default UnlockLevel;