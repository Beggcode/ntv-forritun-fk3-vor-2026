import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormContainer, FormActions } from "../styles/ProjectForm.styles";

const projectSchema = z.object({
	name: z.string().min(1, "Project name is required").max(50),
	description: z.string().max(200).optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
	onSubmit: (data: ProjectFormData) => void;
	onCancel: () => void;
}

export const ProjectForm = ({ onSubmit, onCancel }: ProjectFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
	});

	return (
		<FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3}>
				<TextField
					fullWidth
					label="Project Name *"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name?.message}
					autoFocus
				/>

				<TextField
					fullWidth
					multiline
					rows={3}
					label="Description (optional)"
					{...register("description")}
					error={!!errors.description}
					helperText={errors.description?.message}
				/>

				<FormActions direction="row" spacing={2}>
					<Button onClick={onCancel} color="inherit">
						Cancel
					</Button>
					<Button
						type="submit"
						variant="contained"
						startIcon={<AddIcon />}
						sx={{ fontWeight: "bold" }}
					>
						Create Project
					</Button>
				</FormActions>
			</Stack>
		</FormContainer>
	);
};
