import {SubmitHandler, useForm} from "react-hook-form";
import { Stakeholder } from "../types/stakeholder";

import z from "zod";

const StakeholderForm = ()=> {

    const {register , handleSubmit, watch, formState: {errors}} = useForm<Stakeholder>();
    z.string().email().safeParse("").success;

    
    const onSubmit : SubmitHandler<Stakeholder> = data => {        console.log(data);
    }
    
    return <form onSubmit={handleSubmit(onSubmit)} className="stakeholder-form">

        <div className="name-controls">

        <div className="form-control">
        <input
            {...register("firstName", { required: "First name is required" , validate: async ()=> await new Promise(resolve => setTimeout(() => resolve(false), 10000))})} 
            placeholder="First name" 
            type="text" />
        {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
        </div>
        <input {...register("lastName")} placeholder="Last name" type="text" />
        </div>
        <input {...register("email")} placeholder="Email" type="email" />
        <input {...register("role")} placeholder="Role" type="text" />
        <input {...register("organisation")} placeholder="Organisation" type="text" />
        <input {...register("title")} placeholder="Title" type="text" />
        <input type="submit" value="Submit" />
    </form>
}

export default StakeholderForm;