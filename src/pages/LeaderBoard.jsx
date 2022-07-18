import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import TopHeader from '../components/smalltopheader/TopHeader';
import Header from '../partials/header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { Select } from 'antd';
import * as api from '../utils/api';
import DataTable from 'react-data-table-component';
import { withTranslation } from 'react-i18next';
const { Option } = Select;
const LeaderBoard = ({ t }) => {
    const [leaderBoard, setLeaderBoard] = useState({ myRank: '', data: '', total: '' });
    const [category, setCategory] = useState("Daily");
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const columns = [
        {
            name: t('Rank'),
            selector: row => `${row.user_rank}`,
            sortable: true,
        },
        {
            name: t('Profile'),
            selector: row => row.profile ?
                <div className='leaderboard-profile'>
                    <img src={row.profile} className='w-100' alt={row.name}></img>
                </div>
                :
                <div className='leaderboard-profile'>
                    <img src={process.env.PUBLIC_URL + "/images/user.png"} className='w-25' alt={row.name}></img>
                </div>,
            sortable: true,
        },
        {
            name: t('Player'),
            selector: row => `${row.name}`,
            sortable: true,
        },
        {
            name: t('Score'),
            selector: row => `${row.score}`,
        },
    ];

    const getDailyLeaderBoard = (offset, limit) => {
        api.getDailyLeaderBoard(offset, limit).then((response) => {
            if (!response.error) {
                setTableData(response.data, response.total)
            }
        });
    }

    const getMonthlyLeaderBoard = (offset, limit) => {
        api.getMonthlyLeaderBoard(offset, limit).then((response) => {
            if (!response.error) {
                setTableData(response.data, response.total);
            }
        });
    }

    const getGlobleLeaderBoard = (offset, limit) => {
        api.getGlobleLeaderBoard(offset, limit).then((response) => {
            if (!response.error) {
                setTableData(response.data, response.total);
            }
        });
    }

    const fetchData = (category, limit, offset) => {
        limit = limit ? limit : 10;
        offset = offset ? offset : 0;
        if (category === "Daily") {
            getDailyLeaderBoard(offset, limit);
        } else if (category === "Monthly") {
            getMonthlyLeaderBoard(offset, limit);
        } else {
            getGlobleLeaderBoard(offset, limit);
        }
    }

    const setTableData = (data, total) => {
        var myRank = data[0];
        data = data.slice(1);
        setLeaderBoard({ myRank: myRank, data: data, total: total });

    }
    
    const handleCategoryChange = (category) => {
        setCategory(category);
        setLimit(10);
        setOffset(0);
        fetchData(category, limit, offset);
    }

    const changePage = (page) => {
        var offset = (limit * page) - limit;
        fetchData(category, limit, offset);
    }

    useEffect(() => {
        getDailyLeaderBoard(0, 10);
    }, []);


    return (
        <React.Fragment>
            <SEO title="LeaderBoard" />
            <TopHeader />
            <Header />
            <Breadcrumb title={t("LeaderBoard")} content={t("Home")} contentTwo={t("LeaderBoard")} />

            <div className="LeaderBoard">
                <div className="container">
                    <div className="row morphisam">
                        <div className="col-md-4 col-12 d-flex align-items-center">
                            <h5>{t("LeaderBoard")}</h5>
                        </div>
                        <div className="col-md-8 col-12">
                            <div className="row">
                                <div className="two_content_data">
                                    <div className="sorting_area">
                                        <span>{t('Sort')} :</span>
                                        <Select defaultValue="Daily" className='selectvalue' onChange={handleCategoryChange}>
                                            <Option value="Daily">{t('Daily')}</Option>
                                            <Option value="Monthly">{t('Monthly')}</Option>
                                            <Option value="Global">{t('Global')}</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table_content mt-3">
                            <DataTable title="" columns={columns} data={leaderBoard && leaderBoard.data} pagination highlightOnHover
                                paginationServer
                                paginationTotalRows={leaderBoard && leaderBoard.total}
                                paginationPerPage={limit}
                                paginationComponentOptions={{
                                    noRowsPerPage: true
                                }}
                                className="dt-center"
                                onChangePage={page => changePage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default withTranslation()(LeaderBoard);