export interface Incident {
    dr_no: string;
    date_rptd: string;
    date_occ: string;
    time_occ: number;
    area: number;
    area_name: string;
    rpt_dist_no: number;
    part_1_2: number;
    crm_cd: string;
    crm_cd_desc: string;
    mocodes?: string[];
    vict_age?: number;
    vict_sex?: "M" | "F" | "X";
    vict_descent?: string;
    premis_cd?: number;
    premis_desc?: string;
    weapon_used_cd?: number;
    weapon_desc?: string;
    status: string;
    status_desc: string;
    crm_cd_1?: string;
    crm_cd_2?: string;
    location?: string;
    cross_street?: string;
    lat?: number;
    lon?: number;
}
